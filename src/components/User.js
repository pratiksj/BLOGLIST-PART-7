import React from "react";
import { Link } from "react-router-dom";
const User = ({ listOfUser }) => {
  console.log("this is from User component", listOfUser);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <h1>users</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <h3>blog created</h3>
            </td>
          </tr>
          {listOfUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
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

{
  /* {listOfUser
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
            : null} */
}
