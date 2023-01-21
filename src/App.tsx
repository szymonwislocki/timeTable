import "./App.css";
import Add from "./components/Add";
import Controlbar from "./components/Controlbar";
import MainScreen from "./components/MainScreen";
import Dialog from "@mui/material/Dialog";
import { FormEvent, useState } from "react";
import { Box, Button, DialogTitle, TextField, Typography } from "@mui/material";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<null | string>(null);

  return (
    <>
      <Login open={!Boolean(user)} setUser={setUser} />
      <Controlbar />
      <MainScreen />
      <Add />
    </>
  );
}

export default App;
