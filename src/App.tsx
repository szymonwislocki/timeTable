import "./App.css";
import Add from "./components/Add";
import Controlbar from "./components/Controlbar";
import MainScreen from "./components/MainScreen";
import { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { UserDataContext } from "./providers/userData";
import Loader from "./components/Loader";
import { collection,  DocumentData, getDocs, query, where } from "firebase/firestore";

function App() {
  const { user, setUser, setUserSettings, setUserShifts, userShifts } = useContext(UserDataContext);

  const [loader, setLoader] = useState(true);

  const getUserData = async (): Promise<void> => {
    const userSettings = await getDocs(query(collection(db, "userConfig"), where("email", "==", user)));
    userSettings.forEach((d: DocumentData) => setUserSettings(d.data()));
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
