import { Card, Typography } from "@mui/material";
import { FC } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Schedule: FC = () => {
  return (
    <Card sx={{ m: 1, p: 1.5 }}>
      <Typography variant="body2" component="p">
        8:00 – 16:00
      </Typography>
      <Typography variant="subtitle2" component="span">
        <CalendarMonthIcon sx={{ fontSize: 12 }} /> 01-01-2023 <AccessTimeIcon sx={{ fontSize: 12 }} /> 8 godzin – <PaidIcon sx={{ fontSize: 12 }} /> 400 PLN
      </Typography>
    </Card>
  );
};

export default Schedule;
