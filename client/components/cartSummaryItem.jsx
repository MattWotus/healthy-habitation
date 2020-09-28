import React from 'react';

function CartSummaryItem(props) {
  const image = props.image;
  const product = props.product;
  const price = formatter.format(insertDecimal(props.price));
  const shortDescription = props.shortDescription;
  return (
    <div className='border mt-3 mb-3 colorWhite'>
      <div className='row pt-3 pb-3'>
        <div className='col-12 col-md-4 d-flex justify-content-center'>
          <div className='card-group pl-2 pr-2'>
            <div className='card cartCard'>
              <img src={image} className='card-img-top' alt={product} />
            </div>
          </div>
        </div>
        <div className='col-12 col-md-7 d-flex flex-column justify-content-center ml-2 mr-2'>
          <h2>{product}</h2>
          <h4 className='textColor'>{price}</h4>
          <h5>{shortDescription}</h5>
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

export default CartSummaryItem;
