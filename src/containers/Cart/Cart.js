import React, { Component } from 'react'
import classes from './Cart.css';
import { Link } from 'react-router-dom';
import display from '../../assets/images/testimg.jpg';

class Album extends Component {

    render() {
        return (
            <div className={classes.Main}>
                <div className={classes.Album}>
                    <h1>Shopping Cart</h1>
                    <div className={classes.Cart}>
                        <table className={classes.Table}>
                            <thead className={classes.Thead}>
                                <tr className={classes.TheadTrow}>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh4, classes.ThTrTh5].join(' ')}></th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join(' ')}>Product</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Color</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh7].join(' ')}>Size</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Price</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Qty</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5, classes.ThTrTh8].join(' ')}>Amount</th>
                                    <th className={[classes.ThTrTh1, classes.ThTrTh6, classes.ThTrTh2, classes.ThTrTh3, classes.ThTrTh5].join('')}></th>
                                </tr>
                            </thead>
                            <tbody className={classes.Tbody}>
                                <tr className={classes.TbTr}>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                                        <div className={classes.AlbumImage} >
                                            <img src={display} alt="Album_Thumbnail" />
                                        </div>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                                        <span>
                                            <Link to="#product" className={classes.ThTrTh11}>Spring Jacket</Link>
                                            <br />
                                            <small>by Dolce&Gabbana</small>
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>Red</td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>M</td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                                        <span>
                                            <small>$</small>
                                            549
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>
                                        <span>
                                            3433
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                                        <span>
                                            <small>$</small>
                                            549
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                                        <div className={classes.ibutton}>
                                            <i class="fas fa-times-circle"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={classes.TbTr}>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                                        <div className={classes.AlbumImage} >
                                            <img src={display} alt="Album_Thumbnail" />
                                        </div>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                                        <span>
                                            <Link to="#product" className={classes.ThTrTh11}>Spring Jacket</Link>
                                            <br />
                                            <small>by Dolce&Gabbana</small>
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>Red</td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>M</td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                                        <span>
                                            <small>$</small>
                                            549
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>
                                        <span>
                                            3433
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                                        <span>
                                            <small>$</small>
                                            549
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                                        <div className={classes.ibutton}>
                                            <i class="fas fa-times-circle"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr className={classes.TbTr}>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                                        <div className={classes.AlbumImage} >
                                            <img src={display} alt="Album_Thumbnail" />
                                        </div>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh10].join(' ')} >
                                        <span>
                                            <Link to="#product" className={classes.ThTrTh11}>Spring Jacket</Link>
                                            <br />
                                            <small>by Dolce&Gabbana</small>
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>Red</td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh1].join(' ')}>M</td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13].join(' ')}>
                                        <span>
                                            <small>$</small>
                                            549
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh14].join(' ')}>
                                        <span>
                                            3433
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh12, classes.ThTrTh9, classes.ThTrTh3, classes.ThTrTh13, classes.ThTrTh15].join(' ')}>
                                        <span>
                                            <small>$</small>
                                            549
                                        </span>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')}>
                                        <div className={classes.ibutton}>
                                            <i class="fas fa-times-circle"></i>
                                        </div>
                                    </td>
                                </tr>

                                <tr className={[classes.TbTr, classes.ThTrTh20].join(' ')}>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9].join(' ')} colSpan={3}></td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh21].join(' ')}>TOTAL</td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh22].join(' ')}>
                                        <span><small>$</small>2,346</span>
                                    </td>
                                    <td className={[classes.ThTrTh1, classes.ThTrTh3, classes.ThTrTh9, classes.ThTrTh23].join(' ')} colSpan={3}></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div >
        )
    }
}

export default Album;
