import { Alert, AlertTitle } from "@mui/material";
import { FC } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

const Reminder: FC = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Wygląda na to, że zbliża się koniec zdefiniowanego przez Ciebie okresu rozliczeniowego</AlertTitle>
      Jeśli faktycznie niebawem chcesz zacząć rozliczenie od nowa, użyj przycisku <SettingsIcon sx={{ fontSize: "15px" }} /> w prawym, górnym rogu i wybierz funkcję "Zamknij okres".
    </Alert>
  );
};

export default Reminder;
