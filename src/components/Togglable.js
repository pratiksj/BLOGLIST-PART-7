/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
        {/* <button onClick={toggleVisibility}>{props.buttonLabel}</button> */}
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="error"
          type="submit"
          // style={{
          //   position: "absolute",
          //   top: "254px",
          //   right: "1040px",
          // }}

          style={{
            margin: "0 auto",
            display: "flex",
            right: "450px",
            bottom: "37px",
          }}
          onClick={toggleVisibility}
        >
          cancel
        </Button>
        {/* <button onClick={toggleVisibility}>cancel</button> */}
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
