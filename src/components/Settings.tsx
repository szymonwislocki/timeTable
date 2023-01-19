import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

interface SimpleDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Settings: React.FC<SimpleDialogProps> = ({ open, setOpen }) => {
  //   const handleChange = (event: SelectChangeEvent) => {
  //     setState(event.target.value as string);
  //   };

  return (
    <Dialog open={open} onClose={setOpen}>
      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
        <DialogTitle>Ustawienia</DialogTitle>
        <TextField label="Waluta" />
        <TextField label="Stawka godzinowa" />
        <Button variant="outlined" color="error">
          Zamknij okres
        </Button>
        <Button variant="contained" color="success">
          Zapisz
        </Button>
      </Box>
    </Dialog>
  );
};
export default Settings;
