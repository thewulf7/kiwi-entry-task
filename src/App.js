import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, getMuiTheme, colors } from 'material-ui/styles';
import './App.css';
import configureStore from './config/configureStore';
import MainPage from './routes/MainPage';

const store = configureStore();

const muiTheme = getMuiTheme(
    {
        palette: {
            primary1Color: colors.deepPurple500,
            accent1Color: colors.yellow500,
        },
    }
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
                    <MainPage />
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
