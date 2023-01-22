import { FC, FormEvent, useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, ButtonBase, Dialog, DialogTitle, Fab, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserDataContext } from "../providers/userData";

interface ShiftData extends HTMLFormControlsCollection {
  begin: HTMLInputElement;
  end: HTMLInputElement;
  date: HTMLInputElement;
}

const Add: FC = () => {
  const { user } = useContext(UserDataContext);

  const [showAddNew, setShowAddNew] = useState<boolean>(false);

  const docReference = doc(collection(db, "shifts"));
  const newShift = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    const form = e.currentTarget.elements as ShiftData;
    const formInputs = {
      begin: form.begin.value,
      end: form.end.value,
      date: form.date.value,
    };

    await setDoc(docReference, {
      email: user,
      id: docReference.id,
      ...formInputs,
    });
  };
  return (
    <>
      <Dialog open={showAddNew}>
        <Box onSubmit={newShift} component="form" sx={{ width: 250, display: "flex", flexDirection: "column", p: 1.5, gap: 1 }}>
          <DialogTitle>Dodaj zmianę</DialogTitle>
          <TextField id="begin" helperText="Początek zmiany" type="time" />
          <TextField id="end" helperText="Koniec zmiany" type="time" />
          <TextField id="date" helperText="Dzień pracy" type="date" />
          <Button variant="contained">Wyślij</Button>
          <Button variant="outlined" color="error">
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
