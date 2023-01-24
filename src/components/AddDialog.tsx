import { ChangeEvent, FC,  useContext, useState } from "react";
import { Box, Button,  Dialog, DialogTitle,  TextField } from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserDataContext } from "../providers/userData";
interface Props {
  showAddNew: boolean;
  setShowAddNew: (v: boolean) => void;
}
const AddDialog: FC<Props> = ({ showAddNew, setShowAddNew }) => {
  const { user, userShifts, setUserShifts } = useContext(UserDataContext);

  const docReference = doc(collection(db, "shifts"));

  const [shift, setShift] = useState<UserShift>({
    begin: "08:00",
    end: "16:00",
    date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  } as UserShift);

  const newShift = async (): Promise<void> => {
    setShift((prev) => ({ ...prev, time: +shift.end.split(":")[0] - +shift.begin.split(":")[0] }));
    setUserShifts([...userShifts, shift]);
    await setDoc(docReference, { ...shift, email: user, id: docReference.id });
    setShowAddNew(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, action: string) => {
    setShift((prev) => ({ ...prev, [action]: e.currentTarget.value }));
  };

  return (
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
  );
};

export default AddDialog;
