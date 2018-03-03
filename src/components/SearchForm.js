import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { Paper, AutoComplete, RaisedButton, DatePicker, CircularProgress, Dialog, FlatButton } from 'material-ui';
import { searchFlights, dateChanged, fromChanged, toChanged, dismissError, searchLocation } from '../actions';

class SearchForm extends Component {
    constructor() {
        super();

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onFromChanged = this.onFromChanged.bind(this);
        this.onToChanged = this.onToChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onButtonClick() {
        const { fromValue, toValue, dateValue } = this.props;
        this.props.searchFlights(fromValue, toValue, dateValue.format('YYYY-MM-DD'));
    }

    onFromChanged(text, dataSource, params) {
        this.props.fromChanged(text);
        this.onUpdateAutocomplete('fromSuggestions')(text);
    }

    onToChanged(text, dataSource, params) {
        this.props.toChanged(text);
        this.onUpdateAutocomplete('toSuggestions')(text);
    }

    onUpdateAutocomplete(type) {
        return _.debounce(value => this.props.searchLocation(value, type), 300);
    }

    onDateChanged(nullObject, date) {
        this.props.dateChanged(moment(date));
    }

    render() {
        const {
            toValue,
            fromValue,
            dateValue,
            errorFrom,
            errorTo,
            errorDate,
            loading,
            flightsListError,
            dismissError,
            fromSuggestions,
            toSuggestions
        } = this.props;
        const { containerStyle, inputStyle, buttonContainerStyle } = styles;

        return (
            <Paper style={containerStyle}>
                <div>
                    <AutoComplete
                        dataSource={fromSuggestions}
                        floatingLabelText="From"
                        filter={(searchText, key) => searchText !== ''}
                        maxSearchResults={5}
                        style={inputStyle}
                        onUpdateInput={this.onFromChanged}
                        errorText={errorFrom}
                        searchText={fromValue}
                    />
                    <AutoComplete
                        dataSource={toSuggestions}
                        filter={(searchText, key) => searchText !== ''}
                        floatingLabelText="To"
                        style={inputStyle}
                        maxSearchResults={5}
                        onUpdateInput={this.onToChanged}
                        searchText={toValue}
                        errorText={errorTo}
                    />
                    <DatePicker
                        autoOk
                        minDate={new Date()}
                        mode="landscape"
                        formatDate={date => moment(date).format('LL')}
                        style={inputStyle}
                        floatingLabelText="Date"
                        onChange={this.onDateChanged}
                        value={dateValue.toDate()}
                        errorText={errorDate}
                    />
                </div>
                <div style={buttonContainerStyle}>
                    {!loading && <RaisedButton
                        primary
                        label="Search"
                        onClick={this.onButtonClick}
                    />}
                    {loading && <CircularProgress />}
                </div>
                <Dialog
                    open={flightsListError !== null}
                    title="Error"
                    actions={<FlatButton
                        label="Ok"
                        primary
                        onClick={() => {
                            dismissError();
                        }}
                    />}
                >{flightsListError}</Dialog>
            </Paper>
        );
    }
}

const styles = {
    containerStyle: {
        padding: 10,
        flexDirection: 'column'
    },
    inputStyle: {
        display: 'inline-block',
        margin: 5,
    },
    buttonContainerStyle: {
        width: '100%',
        textAlign: 'center'
    }
};

const mapStateToProps = (state) => {
    const {
        toValue,
        fromValue,
        dateValue,
        errorFrom,
        errorTo,
        errorDate,
        loading,
        flightsListError,
        fromSuggestions,
        toSuggestions
    } = state.search;

    return {
        loading,
        toValue,
        fromValue,
        dateValue,
        errorFrom,
        errorTo,
        errorDate,
        flightsListError,
        fromSuggestions: fromSuggestions.map(item => item.name),
        toSuggestions: toSuggestions.map(item => item.name)
    };
};

export default connect(mapStateToProps, {
    searchFlights,
    dateChanged,
    fromChanged,
    toChanged,
    dismissError,
    searchLocation
})(SearchForm);
