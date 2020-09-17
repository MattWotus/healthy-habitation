import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({ view: { name: name, params: params } });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12 bg-dark d-flex align-items-center'>
              <Header />
            </div>
          </div>
          <div className="main">
            <ProductList setView={this.setView} />
          </div>
        </div>
      );
    } else if (this.state.view.name === 'details') {
      return (
        <div className='container-fluid containerHeight'>
          <div className='row'>
            <div className='col-12 bg-dark d-flex align-items-center'>
              <Header />
            </div>
          </div>
          <ProductDetails params={this.state.view.params} setView={this.setView} />
        </div>
      );
    }
  }
}
