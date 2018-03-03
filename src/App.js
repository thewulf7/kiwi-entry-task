import React, { Component } from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import configureStore from './config/configureStore';
import MainPage from './routes/MainPage';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <MainPage />
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
