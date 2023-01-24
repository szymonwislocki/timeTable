import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";

interface Props {
  loader: boolean;
}

const Loader: FC<Props> = ({ loader }) => {
  return (
    <Backdrop sx={{ zIndex: 2, backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)" }} open={loader}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
