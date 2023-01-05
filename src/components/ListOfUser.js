import React from "react";

export const ListOfUser = ({ singleUser }) => {
  console.log("this is single user", singleUser);
  if (!singleUser) return null;
  return (
    <div>
      <h1>{singleUser.name}</h1>
      <h1>added blogs</h1>
      {singleUser.blogs && (
        <ul>
          {singleUser.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
