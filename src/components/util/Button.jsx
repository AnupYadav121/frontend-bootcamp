import React from "react";

function Button(props) {
  return (
    <button
      onClick={props.buttonCall}
      onMouseOver={props.onMouseOver}
      className="button"
    >
      {props.iconButton} {props.buttonContent}
    </button>
  );
}

export default Button;
