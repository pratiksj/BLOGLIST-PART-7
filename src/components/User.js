import React from "react";
import { Link } from "react-router-dom";

import { InfoOfUser } from "./InfoOfUser";

const User = ({ listOfUser }) => {
  console.log("this is from User component", listOfUser);

  return (
    <div>
      <InfoOfUser />
      <table>
        <thead>
          <tr>
            <td>
              <h1>users</h1>
            </td>
            &nbsp; &nbsp; &nbsp;
            {/* <td>
              <h1>blogs created </h1>
            </td> */}
          </tr>
        </thead>
        <tbody>
          {/* {listOfUser
            ? listOfUser.map((user) => {
                return (
                  <div key={user.id}>
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  </div>
                );
              })
            : null} */}
          <tr>
            <td></td> &nbsp; &nbsp; &nbsp;
            <td>
              <h3>blog created</h3>
            </td>
          </tr>
          {listOfUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  {/* <Link to={"/users/:id"}>{user.name}</Link> */}
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
