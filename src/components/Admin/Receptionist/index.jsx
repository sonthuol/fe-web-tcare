import { Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import userService from "../../../services/Auth/user.service";
const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    userService.getReceptionistBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return <Paper>{content}</Paper>;
};
export default Home;
