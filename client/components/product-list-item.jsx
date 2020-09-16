import React from 'react';

function ProductListItem(props) {
  const image = props.image;
  const product = props.product;
  const price = formatter.format(insertDecimal(props.price));
  const description = props.description;
  return (
    <div className="col-4">
      <div className="card mb-5">
        <img src={image} className="card-img-top" alt={product} />
        <div className="card-body">
          <h5 className="card-title">{product}</h5>
          <p className="card-text">{price}</p>
          <p className="card-text">{description}</p>
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
