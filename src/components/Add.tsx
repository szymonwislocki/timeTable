import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonBase, Fab, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Add: FC = () => {
  return (
    <Fab color="success" sx={{ height: 100, width: 100, position: "fixed", bottom: "30px", right: "50px" }}>
      <AddIcon />
    </Fab>
  );
};

export default Add;
