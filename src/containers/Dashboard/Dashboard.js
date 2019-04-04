import React, { Component } from 'react'

import classes from './Dashboard.css';
import Products from '../../components/Dashboard/Products/Products';
import Vlogs from '../../components/Dashboard/Vlogs/Vlogs';
import Blogs from '../../components/Dashboard/Blogs/Blogs';


class Dashboard extends Component {

    render() {

        return (
                <div className={classes.Main}>
                    {/* <div className={classes.Blogs}>
                        <h1>Navigate to Blogs</h1>
                    </div> */}
                    <div className={classes.ProductsPanel}>
                        <div className={classes.Filters}><h2>Filter Tab</h2></div>
                        <div className={classes.Products}>
                            <div className={classes.ProductCard}>

                                <Blogs />

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
