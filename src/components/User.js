import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
const User = ({ listOfUser }) => {
  console.log("this is from User component", listOfUser);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Users</strong>
              </TableCell>
              <TableCell>
                <strong>Blogs</strong>
              </TableCell>
            </TableRow>
            {listOfUser.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>

                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <table>
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
      </table> */}
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
