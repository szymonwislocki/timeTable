import { useState } from "react";
import "./App.css";
import Add from "./components/Add";
import Controlbar from "./components/Controlbar";
import MainScreen from "./components/MainScreen";

function App() {

  return (
    <>
      <Controlbar />
      <MainScreen />
      <Add />
    </>
  );
}

export default App;
