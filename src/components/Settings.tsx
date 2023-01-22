import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Button, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserDataContext } from "../providers/userData";
import { Preview } from "@mui/icons-material";
import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import SaveIcon from "@mui/icons-material/Save";
interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const Settings: React.FC<Props> = ({ open, setOpen }) => {
  const {
    userSettings: { currency, rate, id, firstConfig },
    setUserSettings,
  } = useContext(UserDataContext);

  const saveIconStyling = { position: "relative", top: 5, left: 5 };

  const handleSave = async (action: string | number): Promise<void> => {
    const docref = doc(db, "userConfig", `${id}`);
    if (action === currency) updateDoc(docref, { currency: currency });
    if (action === rate) updateDoc(docref, { rate: rate });
    if (!firstConfig) updateDoc(docref, { firstConfig: true });
  };

  return (
    <Dialog open={open} onClose={setOpen}>
      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
        <DialogTitle sx={{ p: 0 }}>Ustawienia</DialogTitle>
        <Box>
          <TextField sx={{ width: "80%" }} select label={`Waluta (${currency})`} value={currency} onChange={(e) => setUserSettings((prev) => ({ ...prev, currency: e.target.value }))}>
            <MenuItem value="PLN">PLN</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </TextField>
          <IconButton onClick={() => handleSave(currency)} sx={saveIconStyling} aria-label="save">
            <SaveIcon />
          </IconButton>
        </Box>
        <Box>
          <TextField sx={{ width: "80%" }} label={`Stawka h w ${currency} (${rate})`} type="number" value={rate} onChange={(e) => setUserSettings((prev) => ({ ...prev, rate: Math.abs(+e.target.value) }))} />
          <IconButton onClick={() => handleSave(rate)} sx={saveIconStyling} aria-label="save">
            <SaveIcon />
          </IconButton>
        </Box>
        <Button component="div" variant="outlined" color="error">
          Zamknij okres
        </Button>
      </Box>
    </Dialog>
  );
};
export default Settings;
