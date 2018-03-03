import React, { Component } from 'react';
import { connect } from 'react-redux';
import { colors } from 'material-ui/styles';
import SearchForm from '../components/SearchForm';
import TicketsList from '../components/FlightsList';

class MainPage extends Component {
    render() {
        const { initialState } = this.props;
        const { containerStyle, containerResultsStyle } = styles;

        return (
            <div style={initialState ? containerStyle : containerResultsStyle}>
                <div>
                    <h1 style={{ color: colors.deepPurple500, textAlign: 'center' }}>Quick Kiwi Search {initialState ? '' : 'Results' }</h1>
                    <SearchForm />
                    {!initialState && <TicketsList />}
                </div>
            </div>
        );
    }
}

const styles = {
    containerStyle: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerResultsStyle: {
        alignItems: 'flex-start',
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
};

const mapStateToProps = (state) => {
    const { initialState } = state.mainPage;

    return {
        initialState
    };
};

export default connect(mapStateToProps, {})(MainPage);
