import React, { Component } from 'react';
import classes from './Dashboard.css';
import Products from '../../components/Dashboard/Products/Products';
import Vlogs from '../../components/Dashboard/Vlogs/Vlogs';
import Blogs from '../../components/Dashboard/Blogs/Blogs';


class Dashboard extends Component {


    state = {
        dashcontent: <Products />,
        dash:[
            <Vlogs/>,
            <Products/>,
            <Blogs/>
        ]
    }

    toggleVlogs = () => {
        this.setState({dashcontent: <Vlogs/>})
    }

    toggleProducts = () => {
        this.setState({dashcontent: <Products/>})
    }

    toggleBlogs = () => {
        this.setState({dashcontent: <Blogs/>})
    }

    render() {


        return (
            <div className={classes.Main}>
                {/* <div className={classes.Blogs}>
                        <h1>Navigate to Blogs</h1>
                    </div> */}
                <div className={classes.ProductsPanel}>
                    <div className={classes.Filters}>
                        <div className={classes.Shifters}>
                            <h4 onClick={this.toggleVlogs}>Vlogs</h4>
                            <h4 onClick={this.toggleProducts}>Products</h4>
                            <h4 onClick={this.toggleBlogs}>Blogs</h4>
                        </div>
                    </div>
                    <div className={classes.Products}>
                        <div className={classes.ProductCard}>

                            {this.state.dashcontent}

                        </div>
                    </div>
                </div>
                {/* <div className={classes.Vlogs}>
                        <h1>Navigate to Vlogs</h1>
                    </div> */}

            </div>
        )
    }
}

export default Dashboard;
