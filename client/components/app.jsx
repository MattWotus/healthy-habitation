import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => this.setState({ cart: data }));
  }

  addToCart(product) {
    const newArray = this.state.cart.slice(0, this.state.cart.length);
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(product)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        newArray.push(data);
      })
      .then(() => this.setState({ cart: newArray }));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 bg-dark d-flex align-items-center'>
              <Header cartItemCount={this.state.cart.length} />
            </div>
          </div>
          <div className="main">
            <ProductList setView={this.setView} />
          </div>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div className='container-fluid containerHeight'>
          <div className='row'>
            <Header cartItemCount={this.state.cart.length} />
          </div>
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </div>
      );
    }
  }
}
