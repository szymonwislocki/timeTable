import { Card, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { UserDataContext } from "../providers/userData";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const History: FC = () => {
  const {
    userSettings: { prevPeriod, currency },
  } = useContext(UserDataContext);
  return (
    <Card sx={{ p: 2 }}>
      <Typography component="div" variant="h5">
        Twoja historia
        {prevPeriod?.map(({ begin, end, prevSum, hoursWorked }, i) => (
          <Card sx={{ mt: 0.5, p: 1 }} key={i}>
            <Typography sx={{ mt: 1 }} variant="h6" component="p">
              {prevSum}{" "}
              <Typography variant="subtitle2" component="span">
                {currency}
              </Typography>
            </Typography>
            <Typography sx={{ mt: 1 }} variant="subtitle2">
              Wynagrodzenie za okres:
            </Typography>
            <Typography variant="subtitle1">
              <>
                <CalendarMonthIcon sx={{ fontSize: 12 }} /> {new Date(begin).toLocaleDateString()} – {new Date(end).toLocaleDateString()} <AccessTimeIcon sx={{ fontSize: 12 }} /> {hoursWorked} h
              </>
            </Typography>
          </Card>
        ))}
      </Typography>
    </Card>
  );
};

export default History;
