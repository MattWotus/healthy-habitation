import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: null };
    this.getDetails = this.getDetails.bind(this);
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  render() {
    if (!this.state.products) {
      return <h1></h1>;
    }
    const price = this.state.products.price;
    const formattedPrice = formatter.format(insertDecimal(price));
    return (
      <div className='border mt-3 colorWhite'>
        <div className='row mt-3 mb-3 pl-5 pr-5'>
          <div className='col-12'>
            <button onClick={() => this.props.setView('catalog', {})}><h5 className='mb-0 textColor'>&lt; Back to Catalog</h5></button>
          </div>
        </div>
        <div className='row pl-5 pr-5'>
          <div className='col-12 col-md-4 mb-3'>
            <img src={this.state.products.image} style={{ width: '100%' }} />
          </div>
          <div className='col-12 col-md-8'>
            <h2>{this.state.products.name}</h2>
            <h4 className='textColor'>{formattedPrice}</h4>
            <p>{this.state.products.shortDescription}</p>
            <button onClick={() => this.props.addToCart(this.state.products)} type="button" className="btn btn-primary mb-3">Add to Cart</button>
          </div>
        </div>
        <div className='row pl-5 pr-5'>
          <div className='col-12'>
            <p>{this.state.products.longDescription}</p>
          </div>
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

export default ProductDetails;
