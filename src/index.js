import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as actions from './Store/Actions/index';

import Store from './Store/Store';


const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const creator = localStorage.getItem('creator');
const firstTime = localStorage.getItem('firstTime');
if (token) {
    Store.dispatch(actions.AuthCheckState(token, userId, creator, firstTime));
}

const app = (
    <Provider store={Store} >
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
