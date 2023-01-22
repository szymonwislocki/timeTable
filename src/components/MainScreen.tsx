import { Alert, AlertTitle, Card, Grid } from "@mui/material";
import { FC, useContext } from "react";
import { UserDataContext } from "../providers/userData";
import Hello from "./Hello";
import Schedules from "./Schedules";
import Summary from "./Summary";

const MainScreen: FC = () => {
  const {
    userSettings: { firstConfig },
  } = useContext(UserDataContext);

  return (
    <>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid sx={{ width: "100%" }} item>
          {!firstConfig && <Hello />}
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
