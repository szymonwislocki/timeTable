import "./App.css";
import Add from "./components/Add";
import Controlbar from "./components/Controlbar";
import MainScreen from "./components/MainScreen";
import Dialog from "@mui/material/Dialog";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Backdrop, Box, Button, CircularProgress, DialogTitle, TextField, Typography } from "@mui/material";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { AuthContext } from "./providers/auth";

function App() {
  const { user, setUser } = useContext(AuthContext);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      u ? setUser(u.email) : setUser(null);
      setLoader(false);
    });
    console.log("Effect fired");
  }, [user]);

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: 2 }} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Login open={!Boolean(user) && !loader} />
      <Controlbar />
      <MainScreen />
      <Add />
    </>
  );
}

export default App;
