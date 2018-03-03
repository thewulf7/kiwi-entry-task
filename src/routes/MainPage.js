import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchForm from '../components/SearchForm';
import TicketsList from '../components/TicketsList';

class MainPage extends Component {
    render() {
        const { initialState, flightsList } = this.props;
        const { containerStyle, containerResultsStyle } = styles;

        return (
            <div style={initialState ? containerStyle : containerResultsStyle}>
                <div>
                    <h1 style={{ color: 'white', textAlign: 'center' }}>Quick Kiwi Search {initialState ? '' : 'Results' }</h1>
                    <SearchForm />
                    {!initialState && <TicketsList flightsList={flightsList} />}
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
    const { initialState, flightsList } = state.mainPage;

    return {
        initialState,
        flightsList
    };
};

export default connect(mapStateToProps, {})(MainPage);
