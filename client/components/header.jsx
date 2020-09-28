import React from 'react';

function Header(props) {
  return (
    <div className='col-12 bg-dark d-flex align-items-center justify-content-between pl-5 pr-5'>
      <h3 className='text-light mt-3 mb-3'>$ Wicked Sales</h3>
      <div className='d-flex align-items-center'>
        <h5 className="textColorWhite mb-0 mr-3">{props.cartItemCount} Items</h5>
        <i onClick={() => props.setView('cart', {})} className="fas fa-shopping-cart fa-2x"></i>
      </div>
    </div>
  );
}

export default Header;
