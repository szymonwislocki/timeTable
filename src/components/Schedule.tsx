import { Box, Card, IconButton, Typography } from "@mui/material";
import { FC, useContext } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { UserDataContext } from "../providers/userData";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { EightK } from "@mui/icons-material";
interface Props {
  data: UserShift;
}

const Schedule: FC<Props> = ({ data }) => {
  const { id, begin, end, date, time } = data;
  const { setUserShifts, userShifts } = useContext(UserDataContext);

  const handleDelete = async (): Promise<void> => {
    if (window.confirm("Potwierdź usunięcie wybranej zmiany.")) {
      setUserShifts(userShifts.filter((el) => el.id != id));
      await deleteDoc(doc(db, "shifts", id));
    }
  };

  const getHours = (start: any, end: any) => {
    const hoursinMs = 1000 * 60 * 60;
    return Math.round(Math.abs(end - start) / hoursinMs);
  };

  return (
    <Card sx={{ m: 1, p: 1.5, display: "flex", justifyContent: "space-between" }}>
      <Box>
        <Typography variant="body2" component="p">
          {begin} – {end}
        </Typography>
        <Typography variant="subtitle2" component="span">
          <CalendarMonthIcon sx={{ fontSize: 12 }} /> {date.split("-").reverse().join("-")} {"   "}
          <AccessTimeIcon sx={{ fontSize: 12 }} /> {time} h{/* <PaidIcon sx={{ fontSize: 12 }} /> */}
        </Typography>
      </Box>
      <IconButton onClick={handleDelete}>
        <DeleteIcon sx={{ fontSize: "20px" }} />
      </IconButton>
    </Card>
  );
};

export default Schedule;
