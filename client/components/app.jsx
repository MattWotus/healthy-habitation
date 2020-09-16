import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 bg-dark d-flex align-items-center">
            <Header />
          </div>
        </div>
        <ProductList />
      </div>
    );
  }
}
