import React from "react";
import { Typography, ListItemText } from "@mui/material";

export const ListOfUser = ({ singleUser }) => {
  console.log("this is single user", singleUser);
  if (!singleUser) return null;
  return (
    <div>
      {/* <h1>{singleUser.name}</h1> */}
      <Typography
        align="justify"
        variant="h4"
        mt={4}
        fontSize="25px"
        fontStyle="italic"
        fontWeight="bold"
      >
        Added by {singleUser.name}
      </Typography>

      <Typography
        align="justify"
        variant="h4"
        mt={4}
        fontSize="20px"
        fontStyle="normal"
        fontWeight="bold"
      >
        Added Blogs
      </Typography>

      {/* {singleUser.blogs && (
        <ul>
          {singleUser.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )} */}
      <ul>
        {singleUser.blogs.map((blog) => (
          <ListItemText key={blog.id} sx={{ color: "green" }}>
            {blog.title}
          </ListItemText>
          // <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
