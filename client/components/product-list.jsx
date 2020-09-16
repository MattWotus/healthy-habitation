import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    return (
      <div className="row pt-5 pb-5 d-flex justify-content-around main">
        {
          this.state.products.map(product => {
            return (
              <ProductListItem
                key={product.productId}
                id={product.productId}
                image={product.image}
                product={product.name}
                price={product.price}
                description={product.shortDescription} />
            );
          })
        }
      </div>
    );
  }
}

export default ProductList;
