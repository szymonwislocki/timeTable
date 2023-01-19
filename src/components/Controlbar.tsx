import { AppBar, Button, Icon, Toolbar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import { FC, useState } from "react";
import Settings from "./Settings";

const Controlbar: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar sx={{ m: -1, width: "100vw" }} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cześć, {"name"}
        </Typography>
        <Button color="inherit" variant="outlined">
          <LoginIcon />
        </Button>
        <Button onClick={() => setOpen(true)} sx={{ m: 1 }} color="inherit" variant="outlined">
          <SettingsIcon />
        </Button>
        <Settings open={open} setOpen={() => setOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};

export default Controlbar;
