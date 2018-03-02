import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Paper, AutoComplete, RaisedButton, DatePicker, CircularProgress, Dialog, FlatButton } from 'material-ui';
import { searchFlights, dateChanged, fromChanged, toChanged, dismissError } from '../actions';

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
    }

    onToChanged(text, dataSource, params) {
        this.props.toChanged(text);
    }

    onDateChanged(nullObject, date) {
        this.props.dateChanged(moment(date));
    }

    render() {
        const { toValue, fromValue, dateValue, errorFrom, errorTo, errorDate, loading, flightsListError, dismissError } = this.props;
        const { containerStyle, inputStyle, buttonContainerStyle } = styles;

        return (
            <Paper style={containerStyle}>
                <div>
                    <AutoComplete
                        dataSource={['1']}
                        floatingLabelText="From"
                        style={inputStyle}
                        onUpdateInput={this.onFromChanged}
                        errorText={errorFrom}
                        searchText={fromValue}
                    />
                    <AutoComplete
                        dataSource={['1']}
                        floatingLabelText="To"
                        style={inputStyle}
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
              flightsListError
          } = state.search;

    return {
        loading,
        toValue,
        fromValue,
        dateValue,
        errorFrom,
        errorTo,
        errorDate,
        flightsListError
    };
};

export default connect(mapStateToProps, {
    searchFlights,
    dateChanged,
    fromChanged,
    toChanged,
    dismissError
})(SearchForm);
