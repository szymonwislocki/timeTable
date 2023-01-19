import { Card, Grid } from "@mui/material";
import { FC } from "react";
import Schedules from "./Schedules";
import Summary from "./Summary";

const MainScreen: FC = () => {
  return (
    <Grid sx={{ mt: 1 }} container spacing={2}>
      <Grid item xs={12} md={6}>
        <Schedules />
      </Grid>
      <Grid item xs={12} md={6}>
        <Summary />
      </Grid>
    </Grid>
  );
};

export default MainScreen;
