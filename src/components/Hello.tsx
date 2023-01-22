import { Alert, AlertTitle } from "@mui/material";
import { FC } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

const Hello: FC = () => {
  return (
    <Alert severity="info">
      <AlertTitle>Hej! Wygląda na to, że jesteś tu pierwszy raz.</AlertTitle>
      Naciśnij w prawym, górnym rogu na symbol <SettingsIcon sx={{ fontSize: "15px" }} /> i skonfiguruj działanie aplikacji.
    </Alert>
  );
};

export default Hello;
