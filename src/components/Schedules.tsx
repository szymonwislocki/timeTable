import { Card, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { UserDataContext } from "../providers/userData";
import Schedule from "./Schedule";
import AddIcon from "@mui/icons-material/Add";

const Schedules: FC = () => {
  const { userShifts } = useContext(UserDataContext);

  return (
    <>
      <Card sx={{ p: 1, maxHeight: "50vh", overflowY: "scroll" }}>
        <Typography component="div" variant="h5">
          Twoje przepracowane dni.
        </Typography>

        {userShifts.length ? (
          userShifts.map((shift: UserShift) => <Schedule key={shift.id} data={shift} />)
        ) : (
          <Typography variant="body2">
            Jeszcze niczego tu nie ma. Użyj przycisku z <AddIcon sx={{ fontSize: 20 }} /> w prawym, dolnym rogu, aby dodać nowe dane.
          </Typography>
        )}
      </Card>
    </>
  );
};

export default Schedules;
