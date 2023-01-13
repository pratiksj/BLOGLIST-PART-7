import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
//import { Link } from "react-router-dom";

export const InfoOfUser = ({ logOut }) => {
  const user = useSelector((state) => state.user);
  console.log("this is from user", user);
  if (user === null) return null;
  return (
    <div>
      {user.name} logged in
      <Button
        variant="contained"
        color="error"
        type="submit"
        onClick={logOut}
        style={{
          maxWidth: "40px",
          maxHeight: "25px",
          minWidth: "30px",
          minHeight: "30px",
          fontSize: "8px",
        }}
      >
        logout
      </Button>
      {/* <button onClick={logOut}>logout</button> */}
    </div>
  );
};
