import { Card, Paper } from "@mui/material";
import { FC } from "react";
import Schedule from "./Schedule";

const Schedules: FC = () => {
  return (
    <Card sx={{ p: 1 }}>
      <Schedule />
      <Schedule />
      <Schedule />
      <Schedule />
      <Schedule />
      <Schedule />
    </Card>
  );
};

export default Schedules;
