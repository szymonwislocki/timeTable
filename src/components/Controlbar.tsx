import { AppBar, Button, Icon, Toolbar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { FC } from "react";

const Controlbar: FC = () => {
  return (
    <AppBar sx={{ m: -1, width: "100vw" }} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cześć, {"name"}
        </Typography>
        <Button color="inherit" variant="outlined">
          Zaloguj
        </Button>
        <Button sx={{ m: 1 }} color="inherit" variant="outlined">
          <SettingsIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Controlbar;
