import React from 'react';

function Header(props) {
  const headerStyle = {
    backgroundColor: 'rgb(75, 156, 211)'
  };
  let itemsText = '';
  if (props.cartItemCount === 1) {
    itemsText = 'Item';
  } else {
    itemsText = 'Items';
  }
  return (
    <div className='row' style={headerStyle}>
      <div className='col-12 col-md-6 d-flex align-items-center text-center mt-4 mb-4 pl-5 pr-5 companyName'>
        <h3 className='text-light mb-0'>Healthy Habitation</h3>
      </div>
      <div className='col-12 col-md-6 d-flex align-items-center mb-4 pl-5 pr-5 cartDiv'>
        <h5 className="textColorWhite mb-0 mr-3">{props.cartItemCount} {itemsText}</h5>
        <i onClick={() => props.setView('cart', {})} className="fas fa-shopping-cart fa-2x"></i>
      </div>
    </div >
  );
}

export default Header;
