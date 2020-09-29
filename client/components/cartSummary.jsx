import React from 'react';
import CartSummaryItem from './cartSummaryItem';

function CartSummary(props) {
  let total = 0;
  for (let i = 0; i < props.cart.length; i++) {
    total = total + props.cart[i].price;
  }
  total = formatter.format(insertDecimal(total));
  if (props.cart.length === 0) {
    return (
      <div className='d-flex flex-column boder mt-3 colorWhite'>
        <div className='row mt-3 mb-3 pl-5 pr-5'>
          <div className='col-12'>
            <button onClick={() => props.setView('catalog', {})}><h5 className='mb-0 textColor'>&lt; Back to Catalog</h5></button>
          </div>
        </div>
        <div className='row pl-5 pr-5'>
          <div className='col-12 mb-3'>
            <h2 className="mb-0">My Cart</h2>
          </div>
        </div>
        <div className='row pl-5 pr-5'>
          <div className='col-12 mb-3'>
            <h4>Your cart is empty.</h4>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='d-flex flex-column border mt-3 colorWhite'>
      <div className='row d-flex justify-content-center mt-3 mb-3'>
        <div className='col-10'>
          <button onClick={() => props.setView('catalog', {})}><h5 className='mb-0 textColor'>&lt; Back to Catalog</h5></button>
        </div>
      </div>
      <div className='row d-flex justify-content-center'>
        <div className='col-10'>
          <h2 className="mb-0">My Cart</h2>
        </div>
      </div>
      <div className='row d-flex justify-content-center'>
        <div className='col-10'>
          <ul className="list-group">
            {
              props.cart.map(cartItem => {
                return (
                  <CartSummaryItem
                    key={cartItem.cartItemId}
                    image={cartItem.image}
                    product={cartItem.name}
                    price={cartItem.price}
                    shortDescription={cartItem.shortDescription}
                  />
                );
              })
            }
          </ul>
        </div>
      </div>
      <div className='row d-flex justify-content-center mb-3'>
        <div className='col-10 d-flex justify-content-between'>
          <h2>Total: {total}</h2>
          <button onClick={() => props.setView('checkout', {})} type="button" className="btn btn-primary mb-3">Checkout</button>
        </div>
      </div>
    </div>
  );
}

function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default CartSummary;
