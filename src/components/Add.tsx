import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonBase, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Add: FC = () => {
  return (
    <IconButton color="success" sx={{ position: "fixed", bottom: "30px", right: "50px" }}>
      <AddCircleOutlineIcon sx={{ fontSize: 100 }} />
    </IconButton>
  );
};

export default Add;
