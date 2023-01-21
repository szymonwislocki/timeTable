import { AppBar, Button, Icon, Toolbar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import { FC, useContext, useState } from "react";
import Settings from "./Settings";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../providers/auth";

const Controlbar: FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const handleLogOut = (): void => {
    signOut(auth);
    setUser(null);
  };

  return (
    <AppBar sx={{ m: -1, width: "100vw" }} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TimeTable
        </Typography>
        <Button onClick={handleLogOut} color="inherit" variant="outlined">
          <LoginIcon />
        </Button>
        <Button onClick={() => setSettingsOpen(true)} sx={{ m: 1 }} color="inherit" variant="outlined">
          <SettingsIcon />
        </Button>
        <Settings open={settingsOpen} setOpen={() => setSettingsOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};

export default Controlbar;
