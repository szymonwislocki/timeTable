import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, ButtonBase, Dialog, DialogTitle, Fab, IconButton, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserDataContext } from "../providers/userData";
import { BadgeOutlined } from "@mui/icons-material";
import AddDialog from "./AddDialog";

const Add: FC = () => {
  const [showAddNew, setShowAddNew] = useState<boolean>(false);

  return (
    <>
      <AddDialog showAddNew={showAddNew} setShowAddNew={setShowAddNew} />
      <Fab onClick={() => setShowAddNew(true)} color="success" sx={{ height: "min(20vw, 120px)", width: "min(20vw, 120px)", position: "fixed", bottom: "30px", right: "50px", zIndex: 1 }}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Add;
