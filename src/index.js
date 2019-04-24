import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as actions from './Store/Actions/index';


import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import ContactUsReducer from './Store/Reducers/ContactUs';
import DashboardReducer from './Store/Reducers/Dashboard';
import UserSettingsReducer from './Store/Reducers/UserSettings';
import AuthReducer from './Store/Reducers/Auth';
import AlbumCrudReducer from './Store/Reducers/Album';
import ProductCrudReducer from './Store/Reducers/Product';
import DesignerProfileReducer from './Store/Reducers/DesignerProfile';
import CurrentAlbumReducer from './Store/Reducers/CurrentAlbum';
import CurrentProductReducer from './Store/Reducers/CurrentProduct';
import AddtoCartReducer from './Store/Reducers/AddtoCart';
import CartReducer from './Store/Reducers/Cart';
import CheckoutReducer from './Store/Reducers/Checkout';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootRecucer = combineReducers({
    contactUs: ContactUsReducer,
    Dashboard: DashboardReducer,
    UserSettings: UserSettingsReducer,
    AlbumCrud: AlbumCrudReducer,
    ProductCrud: ProductCrudReducer,
    Auth: AuthReducer,
    DesignerProfile: DesignerProfileReducer,
    CurrentAlbum: CurrentAlbumReducer,
    CurrentProduct: CurrentProductReducer,
    AddtoCart: AddtoCartReducer,
    Cart: CartReducer,
    Checkout: CheckoutReducer
});

const store = createStore(rootRecucer, composeEnhancers(
    applyMiddleware(thunk)
));

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const userflag = localStorage.getItem('userflag');
if (token) {
    store.dispatch(actions.AuthCheckState(token, userId, userflag));
}

const app = (
    <Provider store={store} >
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
