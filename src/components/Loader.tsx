import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";

interface Props {
  loader: boolean;
}

const Loader: FC<Props> = ({ loader }) => {
  return (
    <Backdrop sx={{ color: "#fff" }} open={loader}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
