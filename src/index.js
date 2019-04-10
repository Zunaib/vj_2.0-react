import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as actions from './Store/Actions/index';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ContactUsReducer from './Store/Reducers/ContactUs';
import DashboardReducer from './Store/Reducers/Dashboard';
import AuthReducer from './Store/Reducers/Auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootRecucer = combineReducers({
    contactUs: ContactUsReducer,
    Dashboard: DashboardReducer,
    Auth: AuthReducer
});

const store = createStore(rootRecucer, composeEnhancers(
    applyMiddleware(thunk)
));

const token = localStorage.getItem('token');
if (token) {
    store.dispatch(actions.AuthCheckState(token));
}

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
