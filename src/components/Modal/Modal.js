import React from "react";
import "./Modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };
  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" id="modal">
        <p>{this.props.title}</p>
        <div className="content">{this.props.children}</div>
        <div className="actions">
          {this.props.hideButton !== 'save' && <button className="toggle-button" type="submit">
            Save
          </button>
          }
          <button className="toggle-button" onClick={this.onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};
Modal.defaultProps = {
  title: 'Modal Window',
}
