import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepPurple500 } from 'material-ui/styles/colors';
import logo from './logo.svg';
import './App.css';
import configureStore from './config/configureStore';
import SearchForm from './components/SearchForm';

class App extends Component {
    render() {
        const store = configureStore();
        const { containerStyle } = styles;
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <div style={containerStyle}>
                        <div>
                            <h1 style={{ color: 'white', textAlign: 'center' }}>Quick Search</h1>
                            <SearchForm/>
                        </div>
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

const styles = {
    containerStyle: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default App;
