import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper, AutoComplete, RaisedButton, DatePicker } from 'material-ui';
import { search, dateChanged, fromChanged, toChanged } from '../actions';

class SearchForm extends Component {
    constructor() {
        super();

        this.onButtonClick = this.onButtonClick.bind(this);
        this.onFromChanged = this.onFromChanged.bind(this);
        this.onToChanged = this.onToChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
    }

    onButtonClick() {
        console.info('search button clicked');
    }

    onFromChanged(text, dataSource, params) {
        this.props.fromChanged(text);
    }

    onToChanged(text, dataSource, params) {
        this.props.toChanged(text);
    }

    onDateChanged(nullObject, date) {
        this.props.dateChanged(date);
    }

    render() {
        const { toValue, fromValue, dateValue, errorFrom, errorTo, errorDate } = this.props;
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
                        style={inputStyle}
                        floatingLabelText="Date"
                        onChange={this.onDateChanged}
                        value={dateValue}
                        errorText={errorDate}
                    />
                </div>
                <div style={buttonContainerStyle}>
                    <RaisedButton
                        primary
                        label="Search"
                        onClick={this.onButtonClick}
                    />
                </div>
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
    const { toValue, fromValue, dateValue, errorFrom, errorTo, errorDate } = state.search;

    return {
        toValue,
        fromValue,
        dateValue,
        errorFrom,
        errorTo,
        errorDate
    };
};

export default connect(mapStateToProps, {
    search,
    dateChanged,
    fromChanged,
    toChanged
})(SearchForm);
