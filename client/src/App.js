"use client";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import HomePage from "./Pages/HomePage";
import chatPage from "./Pages/chatPage";

const App = () => {
  return (
    <>
      <div className="App">
        <Route path="/" component={HomePage} exact />
        <Route path="/chats" component={chatPage} />
      </div>
    </>
  );
};

export default App;
