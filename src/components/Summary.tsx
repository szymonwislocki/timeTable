import { Card, Typography } from "@mui/material";
import { FC } from "react";

const Summary: FC = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle2" component="p">
        Liczba godzin przepracowanych w bieżącym okresie:
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="h4" component="p">
        48
      </Typography>
      <Typography variant="subtitle2" component="p">
        Wypracowane wynagrodzenie za okres:
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="h4" component="p">
        2400
      </Typography>
    </Card>
  );
};

export default Summary;
