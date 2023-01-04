import React from "react";
import { useSelector } from "react-redux";
//import { Link } from "react-router-dom";

export const InfoOfUser = () => {
  const user = useSelector((state) => state.user);
  console.log("this is from user", user);
  if (user === null) return null;
  return (
    <div>
      {user.name} logged in
      <button>logout</button>
    </div>
  );
};
