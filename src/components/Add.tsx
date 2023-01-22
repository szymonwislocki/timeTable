import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, ButtonBase, Dialog, DialogTitle, Fab, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserDataContext } from "../providers/userData";

const Add: FC = () => {
  const { user, userShifts, setUserShifts } = useContext(UserDataContext);

  const docReference = doc(collection(db, "shifts"));

  const [showAddNew, setShowAddNew] = useState<boolean>(false);
  const [shift, setShift] = useState<UserShift>({
    begin: "08:00",
    end: "16:00",
    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  } as UserShift);

  const newShift = async (): Promise<void> => {
    setUserShifts([...userShifts, shift]);
    await setDoc(docReference, { ...shift, email: user, id: docReference.id });
    setShowAddNew(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, action: string) => {
    setShift((prev) => ({ ...prev, [action]: e.currentTarget.value }));
  };

  return (
    <>
      <Dialog open={showAddNew}>
        <Box component="form" sx={{ width: 250, display: "flex", flexDirection: "column", p: 1.5, gap: 1 }}>
          <DialogTitle>Dodaj zmianę</DialogTitle>
          <TextField id="begin" helperText="Początek zmiany" type="time" value={shift.begin} onChange={(e) => handleChange(e, "begin")} />
          <TextField id="end" helperText="Koniec zmiany" type="time" value={shift.end} onChange={(e) => handleChange(e, "end")} />
          <TextField id="date" helperText="Dzień pracy" type="date" value={shift.date} onChange={(e) => handleChange(e, "date")} />
          <Button onClick={newShift} variant="contained">
            Wyślij
          </Button>
          <Button component="div" onClick={() => setShowAddNew(false)} variant="outlined" color="error">
            Anuluj
          </Button>
        </Box>
      </Dialog>
      <Fab onClick={() => setShowAddNew(true)} color="success" sx={{ height: 100, width: 100, position: "fixed", bottom: "30px", right: "50px", zIndex: 1 }}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Add;
