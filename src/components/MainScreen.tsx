import { Alert, AlertTitle, Card, Grid } from "@mui/material";
import { FC } from "react";
import Schedules from "./Schedules";
import Summary from "./Summary";
import SettingsIcon from "@mui/icons-material/Settings";

const MainScreen: FC = () => {
  return (
    <>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid sx={{ width: "100%" }} item>
          <Alert severity="info">
            <AlertTitle>Hej! Wygląda na to, że jesteś tu pierwszy raz.</AlertTitle>
            Naciśnij w prawym, górnym rogu na symbol <SettingsIcon sx={{ fontSize: "15px" }} /> i skonfiguruj działanie aplikacji.
          </Alert>
        </Grid>
        <Grid item xs={12} md={6}>
          <Schedules />
        </Grid>
        <Grid item xs={12} md={6}>
          <Summary />
        </Grid>
      </Grid>
    </>
  );
};

export default MainScreen;
