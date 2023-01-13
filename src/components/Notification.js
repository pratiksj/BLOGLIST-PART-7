import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  // const style = {
  //   border: "solid",
  //   padding: 10,
  //   boderWidth: 1,
  // };
  if (notification === null) {
    return null;
  }
  return (
    <div>
      <Alert severity="success">{notification}</Alert>
    </div>
  );
};

export default Notification;
