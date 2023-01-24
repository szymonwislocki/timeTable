import { FC, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
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
