import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
  show,
  onCloseDialog,
  modalTitle,
  btnText,
  content,
}: {
  show: boolean;
  onCloseDialog: () => void;
  content: any;
  modalTitle?: string;
  btnText?: string;
}) {
  const handleClose = () => {
    onCloseDialog();
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={show}
        sx={{
          "zIndex":"20",
          "& .MuiDialog-paper": {
            width: "auto",
            maxWidth: 700,
          },
          "& .MuiDialogContent-root": {
            padding: "0px",
          },
        }}
      >
        {modalTitle && (
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Modal title
          </DialogTitle>
        )}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>{content}</DialogContent>
        {btnText && (
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              {btnText || "Save changes"}
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
