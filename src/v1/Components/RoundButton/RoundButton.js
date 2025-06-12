import React from "react";
import "./RoundButton.scss";
import PropTypes from "prop-types";

export default function RoundButton({ onclick, imageURL }) {
  return (
    <div className="RoundButton" onClick={onclick}>
      <img src={imageURL} />
    </div>
  );
}

RoundButton.propTypes = {
  imageURL: PropTypes.string,
  onclick: PropTypes.func,
};

RoundButton.defaultProps = {
  imageURL: "",
  onclick: () => {},
};
