import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary/Auxilary";
// import Spinner from '../UI/Spinner/Spinner';
import ProductCard from "../UI/Card/Product/ProductCard";

class ALbumProducts extends Component {
  componentDidMount() {
    setTimeout(() => {
      let products = this.props.products;
      const cards = products.map((product, index = product._id) => (
        <ProductCard
          key={product._id}
          pid={product._id}
          likes={product.likes}
          name={product.productName}
          price={product.price}
          images={product.images}
          desc={product.description}
        />
      ));
      this.setState({ products: cards });
    }, 60);
  }

  state = {
    products: null
  };
  render() {
    let albumproducts = this.state.products;
    // if (this.props.loading) {
    //     albumproducts = <Spinner />
    // }
    return <Auxilary>{albumproducts}</Auxilary>;
  }
}

export default ALbumProducts;
