import React from 'react';

function Header(props) {
  return (
    <div className='row bg-dark'>
      <div className='col-12 col-md-6 d-flex align-items-center mt-3 mb-3 pl-5 pr-5 companyName'>
        <h3 className='text-light mb-0'>$ Wicked Sales</h3>
      </div>
      <div className='col-12 col-md-6 bg-dark d-flex align-items-center mb-3 pl-5 pr-5 cartDiv'>
        <h5 className="textColorWhite mb-0 mr-3">{props.cartItemCount} Items</h5>
        <i onClick={() => props.setView('cart', {})} className="fas fa-shopping-cart fa-2x"></i>
      </div>
    </div >
  );
}

export default Header;
