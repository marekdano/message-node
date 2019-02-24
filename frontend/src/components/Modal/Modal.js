import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';
import './Modal.css';

// const modal = props =>
//   ReactDOM.createPortal(
//     <div className="modal">
//       <header className="modal__header">
//         <h1>{props.title}</h1>
//       </header>
//       <div className="modal__content">{props.children}</div>
//       <div className="modal__actions">
//         <Button design="danger" mode="flat" onClick={props.onCancelModal}>
//           Cancel
//         </Button>
//         <Button
//           mode="raised"
//           onClick={props.onAcceptModal}
//           disabled={!props.acceptEnabled}
//           loading={props.isLoading}
//         >
//           Accept
//         </Button>
//       </div>
//     </div>,
//     document.getElementById('modal-root')
//   );

// export default modal;


export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.portalNode = document.createElement('div');
    this.portalNode.dataset.testid = 'portal-modal';
  }

  componentDidMount() {
    document.body.appendChild(this.portalNode);
  }
  componentWillUnmount() {
    this.portalNode.parentNode.removeChild(this.portalNode);
  }
  render() {
    const {props} = this;
    return ReactDOM.createPortal(
      <div className="modal">
        <header className="modal__header">
          <h1>{this.props.title}</h1>
        </header>
        <div className="modal__content">{props.children}</div>
        <div className="modal__actions">
          <Button design="danger" mode="flat" onClick={props.onCancelModal}>
            Cancel
          </Button>
          <Button
            mode="raised"
            onClick={props.onAcceptModal}
            disabled={!props.acceptEnabled}
            loading={props.isLoading}
          >
            Accept
          </Button>
        </div>
      </div>,
      this.portalNode
    );
  }
}
