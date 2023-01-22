import { Card, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { UserDataContext } from "../providers/userData";

const Summary: FC = () => {
  const { userSettings, userShifts } = useContext(UserDataContext);
  console.log(userShifts);
  let total = 0;
  userShifts.map((v) => {
    total += v.time;
  });

  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" component="p">
        Liczba godzin przepracowanych w bieżącym okresie:
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="h4" component="p">
        {userShifts.reduce((a, b) => a + b.time, 0)}
      </Typography>
      <Typography variant="subtitle2" component="p">
        Wypracowane wynagrodzenie za okres:
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="h4" component="p">
        {total * userSettings.rate}
      </Typography>
    </Card>
  );
};

export default Summary;
