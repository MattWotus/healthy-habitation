import React from 'react';

function HomeModal(props) {
  return (
    <div className='modal-overlay hidden'>
      <div className='modal-content d-flex flex-column justify-content-around'>
        <h4 >Disclaimer: This is a demo site. No real purchases will be made.</h4>
        <button onClick={() => props.setView('catalog', {})} type="button" className="btn btn-light understandButton"><p className="mb-0">I understand</p></button>
      </div>
    </div>
  );
}

export default HomeModal;
