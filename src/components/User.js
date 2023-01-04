import React from "react";
//import { useSelector } from "react-redux";
import { InfoOfUser } from "./InfoOfUser";

const User = ({ listOfUser }) => {
  //const blogs = useSelector((state) => state.blogs);

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
            <td>blogs created</td>
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
          {listOfUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
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
