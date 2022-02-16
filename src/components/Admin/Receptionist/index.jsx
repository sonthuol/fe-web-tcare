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
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};
export default Home;
