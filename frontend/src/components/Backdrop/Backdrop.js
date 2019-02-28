import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

// const backdrop = props =>
//   ReactDOM.createPortal(
//     <div
//       className={['backdrop', props.open ? 'open' : ''].join(' ')}
//       onClick={props.onClick}
//     />,
//     document.getElementById('backdrop-root')
//   );

// export default backdrop;


let backdropRoot = document.getElementById('backdrop-root');
if (!backdropRoot) {
  backdropRoot = document.createElement('div');
  backdropRoot.setAttribute('id', 'backdrop-root');
  document.body.appendChild(backdropRoot);
}

export default class Backdrop extends React.Component {
  el =  document.createElement('div');
  
  componentDidMount() {
    backdropRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    backdropRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        className={['backdrop', this.props.open ? 'open' : ''].join(' ')}
        onClick={this.props.onClick}
      />,
      this.el
    );
  }
} 
