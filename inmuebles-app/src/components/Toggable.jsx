import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function Toggable({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div className="m-3 w-25">
      <div style={hideWhenVisible}>
        <Button onClick={() => setVisible(true)}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button className="btn btn-danger mt-2" onClick={() => setVisible(false)}>Cancel</Button>
      </div>
    </div>
  );
}
