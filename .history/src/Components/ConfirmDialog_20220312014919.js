import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ConfirmDialog({
  title,
  message,
  deleteThePost,
  opened,
  handleClose,
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  /*const handleClose = () => {
    setOpen(false);
  };
*/
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={opened}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={deletePost}>
            Confimer
          </Button>
          <Button onClick={handleClose} autoFocus>
            Annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
