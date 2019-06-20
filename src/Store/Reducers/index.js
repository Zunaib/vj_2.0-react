
import { combineReducers } from 'redux';



/* Landing Page Reducers */
import ContactUsReducer from './ContactUSReducers/ContactUs';

/* Auth Reducers */
import AuthReducer from './AuthReducers/Auth';

/* UseAs Reducers */
import UseAsReducer from './UseAsReducers/UseAs';

/* Dashboard Reducers */
import DashboardProductsReducer from './DashboardReducers/Products';
import DashboardVlogsReducer from './DashboardReducers/Vlogs';
import DashboardBlogsReducer from './DashboardReducers/Blogs';

/* Creator Profile Reducers */
import DesignerProductsReducer from './UserReducers/DesignerProducts';
import DesignerAlbumsReducer from './UserReducers/DesignerAlbums';
import DesignerVlogsReducer from './UserReducers/DesignerVlogs';
import DesignerBlogsReducer from './UserReducers/DesignerBlogs';

/* User Settings Reducers */
import UserSettingsReducer from './UserReducers/UserSettings';

/* Album Reducers */
import AddAlbumReducer from './AlbumReducers/AddAlbum';
import ViewAlbumReducer from './AlbumReducers/ViewAlbum';
import DeleteAlbumReducer from './AlbumReducers/DeleteAlbum';
import UpdateAlbumReducer from './AlbumReducers/UpdateAlbum';

/* Product Reducers */
import AddProductReducer from './ProductReducers/AddProduct';
import ViewProductReducer from './ProductReducers/ViewProduct';
import DeleteProductReducer from './ProductReducers/DeleteProduct';
import UpdateProductReducer from './ProductReducers/UpdateProduct';

/* Vlog Reducers */
import AddVlogReducer from './VlogReducers/AddVlog';
import ViewVlogReducer from './VlogReducers/ViewVlog';
import UpdateVlogReducer from './VlogReducers/UpdateVlog';
import DeleteVlogReducer from './VlogReducers/DeleteVlog';

/* Blog Reducers */
import AddBlogReducer from './BlogReducers/AddBlog';
import ViewBlogReducer from './BlogReducers/ViewBlog';
import DeleteBlogReducer from './BlogReducers/DeleteBlog';
import UpdateBlogReducer from './BlogReducers/UpdateBlog';

/* Cart Reducers */
import AddtoCartReducer from './CartReducers/AddtoCart';
import CartReducer from './CartReducers/Cart';

/* Checkout Reducers */
import CheckoutReducer from './CheckoutReducers/Checkout';

/* Orders Reducers */
import CustomerOrdersReducer from './OrderReducers/CustomerOrder';
import DesignerOrdersReducer from './OrderReducers/DesignerOrder';

/* Search Resducer */
import SearchReducer from './SearchReducers/Search';

/*Searched User Reducers */
import UserProfileSettingsReducer from './UserProfile/UserProfileSettings';
import UserProfileProductsReducer from './UserProfile/UserProducts';
import UserProfileAlbumsReducer from './UserProfile/UserAlbums';
import UserProfileVlogsReducer from './UserProfile/UserVlogs';
import UserProfilesBlogsReducer from './UserProfile/UserBlogs';

/*Messeging Reducers*/
import CreateConvoReducer from './MessengerReducers/CreateConverstaion';
import FetchSingleConvoReducer from './MessengerReducers/FetchSingleConversation';
import FetchAllConvoReducer from './MessengerReducers/FetchAllConversations';


export default combineReducers({
    ContactUs: ContactUsReducer,

    Auth: AuthReducer,
    UseAs: UseAsReducer,

    DashboardProducts: DashboardProductsReducer,
    DashboardVlogs: DashboardVlogsReducer,
    DashboardBlogs: DashboardBlogsReducer,


    UserSettings: UserSettingsReducer,

    DesignerProducts: DesignerProductsReducer,
    DesignerAlbums: DesignerAlbumsReducer,
    DesignerVlogs: DesignerVlogsReducer,
    DesignerBlogs: DesignerBlogsReducer,

    AddAlbum: AddAlbumReducer,
    DeleteAlbum: DeleteAlbumReducer,
    ViewAlbum: ViewAlbumReducer,
    UpdateAlbum: UpdateAlbumReducer,

    AddProduct: AddProductReducer,
    DeleteProduct: DeleteProductReducer,
    ViewProduct: ViewProductReducer,
    UpdateProduct: UpdateProductReducer,

    AddVlog: AddVlogReducer,
    ViewVlog: ViewVlogReducer,
    UpdateVlog: UpdateVlogReducer,
    DeleteVlog: DeleteVlogReducer,

    AddBlog: AddBlogReducer,
    ViewBlog: ViewBlogReducer,
    DeleteBlog: DeleteBlogReducer,
    UpdateBlog: UpdateBlogReducer,

    AddtoCart: AddtoCartReducer,
    Cart: CartReducer,

    Checkout: CheckoutReducer,

    CustomerOrders: CustomerOrdersReducer,
    DesignerOrders: DesignerOrdersReducer,

    Search: SearchReducer,

    UserProfileSettings: UserProfileSettingsReducer,
    UserProfileProducts: UserProfileProductsReducer,
    UserProfileAlbums: UserProfileAlbumsReducer,
    UserProfileVlogs: UserProfileVlogsReducer,
    UserProfilesBlogs: UserProfilesBlogsReducer,

    CreateConvo: CreateConvoReducer,
    FetchSingleConvo: FetchSingleConvoReducer,
    FetchAllConvo:FetchAllConvoReducer



});
