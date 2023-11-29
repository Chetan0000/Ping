"use client";
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CHatPage from "./Pages/ChatPage";

const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/chats" Component={CHatPage} />
        </Routes>
      </div>
    </>
  );
};

export default App;
