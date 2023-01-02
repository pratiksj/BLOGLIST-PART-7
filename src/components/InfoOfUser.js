import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const InfoOfUser = () => {
  const user = useSelector((state) => state.user);
  console.log("this is from user", user);
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <Link to="/users">{user.name}</Link> logged in
        {/* {user.name} logged in */}
      </div>
      <button>logout</button>
    </div>
  );
};
