import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';
import CheckoutForm from './checkoutForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'checkout',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify(order)
    })
      .then(() => this.setState({ cart: [] }))
      .then(() => this.setState({ view: { name: 'catalog', params: {} } }));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <Header cartItemCount={this.state.cart.length} setView={this.setView} />
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
            <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          </div>
          <ProductDetails addToCart={this.addToCart} params={this.state.view.params} setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'cart') {
      return (
        <div className='container-fluid containerHeight'>
          <div className='row'>
            <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          </div>
          <CartSummary cart={this.state.cart} setView={this.setView} />
        </div>
      );
    } else if (this.state.view.name === 'checkout') {
      return (
        <div className='container-fluid containerHeight'>
          <div className='row'>
            <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          </div>
          <CheckoutForm placeOrder={this.placeOrder} cart={this.state.cart} setView={this.setView} />
        </div>
      );
    }
  }
}
