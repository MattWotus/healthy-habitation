import React from 'react';

function ProductListItem(props) {
  const image = props.image;
  const product = props.product;
  const price = formatter.format(insertDecimal(props.price));
  const description = props.description;
  return (
    <div className='col-md-6 col-lg-4 d-flex justify-content-center' onClick={props.onClick}>
      <div className='card-group'>
        <div className='card mb-5'>
          <img src={image} className='card-img-top' alt={product} />
          <div className='card-body'>
            <h5 className='card-title mb-2'>{product}</h5>
            <p className='card-text mb-2 textColor'>{price}</p>
            <p className='card-text'>{description}</p>
          </div>
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

export default ProductListItem;
