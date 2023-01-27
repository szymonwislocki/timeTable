import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Button, IconButton, MenuItem, TextField } from "@mui/material";
import { Dispatch, useContext } from "react";
import { UserDataContext } from "../providers/userData";
import { collection, deleteDoc, doc, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import SaveIcon from "@mui/icons-material/Save";
interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const Settings: React.FC<Props> = ({ open, setOpen }) => {
  const {
    userSettings: { currency, rate, id, firstConfig, timeSpan, prevPeriod, beginOfPeriod, endOfPeriod },
    setUserSettings,
    userShifts,
    setUserShifts,
  } = useContext(UserDataContext);

  const docref = doc(db, "userConfig", `${id}`);

  const handleSave = async (action: string | number): Promise<void> => {
    if (action === currency) updateDoc(docref, { currency: currency });
    if (action === rate) updateDoc(docref, { rate: rate });
    if (action === timeSpan) updateDoc(docref, { timeSpan: timeSpan });
    if (!firstConfig) updateDoc(docref, { firstConfig: true });
    setUserSettings((p) => ({ ...p, firstConfig: true }));
  };

  const handleSubtotal = async (): Promise<void> => {
    if (window.confirm("Czy na pewno chcesz rozpocząć nowe rozliczenie? Wszystkie dodane zmiany zostaną usunięte, ale wyniki za cały poprzedni okres będą dostępne w historii.")) {
      const total = userShifts.reduce((a, b) => a + b.time, 0);
      await updateDoc(docref, {
        prevPeriod: [
          ...prevPeriod,
          {
            prevSum: total * rate,
            hoursWorked: total,
            begin: beginOfPeriod,
            end: endOfPeriod,
          } as PreviousPeriodData,
        ],
        beginOfPeriod: new Date().getTime(),
        endOfPeriod: new Date().getTime() + 3600000 * 24 * timeSpan,
      });
      for (let i = 0; i < userShifts.length; i++) {
        await deleteDoc(doc(db, "shifts", userShifts[i].id));
      }
      setUserShifts([]);
      setOpen(false);
    }
  };

  const saveIconStyling = { position: "relative", top: 5, left: 5 };

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
        <Box>
          <TextField sx={{ width: "80%" }} label={`Czas trwania rozliczenia (${timeSpan})`} type="number" value={timeSpan} onChange={(e) => setUserSettings((prev) => ({ ...prev, timeSpan: Math.abs(+e.target.value) }))} />
          <IconButton onClick={() => handleSave(timeSpan)} sx={saveIconStyling} aria-label="save">
            <SaveIcon />
          </IconButton>
        </Box>
        <Button onClick={handleSubtotal} component="div" variant="outlined" color="error">
          Zamknij okres
        </Button>
      </Box>
    </Dialog>
  );
};
export default Settings;
