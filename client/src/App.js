"use client";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./Pages/HomePage";
import chatPage from "./Pages/chatPage";

const App = () => {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={chatPage} />
    </>
  );
};

export default App;
