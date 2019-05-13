
import { combineReducers } from 'redux';



/* Landing Page Reducers */
import ContactUsReducer from './ContactUSReducers/ContactUs';

/* Auth Reducers */
import AuthReducer from './AuthReducers/Auth';

/* Dashboard Reducers */
import DashboardReducer from './DashboardReducers/Dashboard';

/* Creator Profile Reducers */
import DesignerProfileReducer from './UserReducers/DesignerProfile';

/* User Settings Reducers */
import UserSettingsReducer from './UserReducers/UserSettings';

/* Album Reducers */
import AddAlbumReducer from './AlbumReducers/AddAlbum';
import ViewAlbumReducer from './AlbumReducers/ViewAlbum';
import DeleteAlbumReducer from './AlbumReducers/DeleteAlbum';

/* Product Reducers */
import AddProductReducer from './ProductReducers/AddProduct';
import ViewProductReducer from './ProductReducers/ViewProduct';
import DeleteProductReducer from './ProductReducers/DeleteProduct';

/* Vlog Reducers */
import AddVlogReducer from './VlogReducers/AddVlog';
import ViewVlogReducer from './VlogReducers/ViewVlog';
import UpdateVlogReducer from './VlogReducers/UpdateVlog';

/* Cart Reducers */
import AddtoCartReducer from './CartReducers/AddtoCart';
import CartReducer from './CartReducers/Cart';

/* Checkout Reducers */
import CheckoutReducer from './CheckoutReducers/Checkout';

/* Orders Reducers */
import CustomerOrdersReducer from './OrderReducers/CustomerOrder';
import DesignerOrdersReducer from './OrderReducers/DesignerOrder';

export default combineReducers({
    ContactUs: ContactUsReducer,

    Auth: AuthReducer,

    Dashboard: DashboardReducer,

    UserSettings: UserSettingsReducer,

    DesignerProfile: DesignerProfileReducer,

    AddAlbum: AddAlbumReducer,
    DeleteAlbum: DeleteAlbumReducer,
    ViewAlbum: ViewAlbumReducer,

    AddProduct: AddProductReducer,
    DeleteProduct: DeleteProductReducer,
    ViewProduct: ViewProductReducer,

    AddVlog: AddVlogReducer,
    ViewVlog: ViewVlogReducer,
    UpdateVlog: UpdateVlogReducer,

    AddtoCart: AddtoCartReducer,
    Cart: CartReducer,

    Checkout: CheckoutReducer,

    CustomerOrders: CustomerOrdersReducer,
    DesignerOrders: DesignerOrdersReducer

});
