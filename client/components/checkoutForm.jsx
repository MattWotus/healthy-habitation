import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newOrder = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.placeOrder(newOrder);
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('orderForm').reset();
  }

  handleReset() {
    this.setState({
      name: '',
      creditCard: '',
      shippingAddress: ''
    });
    document.getElementById('orderForm').reset();
    this.props.setView('catalog', {});
  }

  render() {
    const name = this.state.name;
    const creditCard = this.state.creditCard;
    const shippingAddress = this.state.shippingAddress;
    let total = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      total = total + this.props.cart[i].price;
    }
    total = formatter.format(insertDecimal(total));
    return (
      <div className='d-flex flex-column boder mt-3 colorWhite'>
        <div className='row d-flex justify-content-center mt-3 mb-4'>
          <div className='col-10 text-center'>
            <h4 className='mb-0'>Disclaimer: This is a demo site. No real purchases will be made. Please don&apos;t use personal information when checking out.</h4>
          </div>
        </div>
        <div className='row d-flex justify-content-center mb-3'>
          <div className='col-10'>
            <button onClick={this.handleReset}><h5 className='textColor'>&lt; Continue Shopping</h5></button>
          </div>
        </div>
        <div className='row d-flex justify-content-center mb-4'>
          <div className='col-10'>
            <h2 className='mb-0'>My Cart</h2>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-10 mb-4'>
            <h4 className="mb-0 textColor">Order Total: {total} </h4>
          </div>
        </div>
        <div className='row d-flex justify-content-center'>
          <form id='orderForm' className='col-10' onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name"><h5 className="mb-0">Name</h5></label>
              <input type="text" id="name" className="form-control" name="name" value={name} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="creditCard"><h5 className="mb-0">Credit Card</h5></label>
              <input type="text" id="creditCard" className="form-control" name="creditCard" value={creditCard} onChange={this.handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="shippingAddress"><h5 className="mb-0">Shipping Address</h5></label>
              <textarea id="shippingAddress" className="form-control" rows="5" name="shippingAddress" value={shippingAddress} onChange={this.handleChange} required />
            </div>
            <div className='row mb-3'>

              <div className='col-12 col-md-6'>
                <button type="submit" className='btn'><h5 className='btn buttonBlue'>Place Order</h5></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default CheckoutForm;
