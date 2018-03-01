import React, { Component } from 'react';
import { Paper, AutoComplete, RaisedButton, DatePicker } from 'material-ui';

class SearchForm extends Component {
    constructor() {
        super();

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        console.info('search button clicked');
    }

    render() {
        const { containerStyle, inputStyle, buttonContainerStyle } = styles;

        return (
            <Paper style={containerStyle}>
                <div>
                    <AutoComplete dataSource={['1']} floatingLabelText="From" style={inputStyle}/>
                    <AutoComplete dataSource={['1']} floatingLabelText="To" style={inputStyle}/>
                    <DatePicker style={inputStyle} floatingLabelText="Date"/>
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

export default SearchForm;
