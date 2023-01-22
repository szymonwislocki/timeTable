import "./App.css";
import Add from "./components/Add";
import Controlbar from "./components/Controlbar";
import MainScreen from "./components/MainScreen";
import Dialog from "@mui/material/Dialog";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Backdrop, Box, Button, CircularProgress, DialogTitle, TextField, Typography } from "@mui/material";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { UserDataContext } from "./providers/userData";
import Loader from "./components/Loader";
import { collection, doc, DocumentData, getDocs, query, where } from "firebase/firestore";

function App() {
  const { user, setUser, setUserSettings, setUserShifts, userShifts } = useContext(UserDataContext);

  const [loader, setLoader] = useState(true);

  const getUserData = async (): Promise<void> => {
    const userSettings = await getDocs(query(collection(db, "userConfig"), where("email", "==", user)));
    userSettings.forEach((d: DocumentData) => setUserSettings(d.data()));
    // const userShiftsData = await getDocs(query(collection(db, "shifts"), where("email", "==", user)));
    // userShiftsData.forEach((d: DocumentData) => setUserShifts(d.data()));
    // console.log(userShifts);
    await getDocs(query(collection(db, "shifts"), where("email", "==", user))).then((q) => {
      const shifts: UserShift[] = [];
      q.forEach((d) => shifts.push(d.data() as UserShift));
      setUserShifts(shifts);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      u ? setUser(u.email) : setUser(null);
      getUserData().then(() => setLoader(false));
    });
  }, [user, userShifts.length]);

  return (
    <>
      <Loader loader={loader} />
      <Login open={!Boolean(user) && !loader} />
      <Controlbar />
      <MainScreen />
      <Add />
    </>
  );
}

export default App;
