import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const ScrollDialog = (props) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionEle = useRef(null);

  useEffect(() => {
    // if (open) {
    //   const { current } = descriptionEle;
    //   if (descriptionEle !== null) {
    //     descriptionEle.focus();
    //   }
    // }
  }, [open]);

  return (
    <ScrollDialogWrap>
      <Button variant="outlined" onClick={() => handleClickOpen("paper")}>
        {props.btnText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          color: "success.main",
          "& .MuiPaper-root": {
            borderRadius: "10px",
          },
          "& .MuiDialogContent-root": {
            padding: "20px",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
        <DialogContent
          sx={{
            height: "540px",
          }}
          dividers={scroll === "paper"}
          onScroll={(e) => {
            console.log("dialog content scroll event");
            const bottom =
              Math.abs(
                e.target.scrollHeight -
                  e.target.scrollTop -
                  e.target.clientHeight
              ) <= 5;

            if (bottom) {
              if (props.handleScrollToBottom) {
                props.handleScrollToBottom(e);
              }
            }
          }}
        >
          {props.children}
        </DialogContent>
        <DialogActions sx={{ padding: "10px 20px", fontSize: "16px" }}>
          <Button
            variant="contained"
            sx={{ marginRight: "10px" }}
            onClick={() => {
              if (props.handleClickConfirm) {
                props.handleClickConfirm();
              }
              handleClose();
            }}
          >
            確認
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (props.handleClickCancel) {
                props.handleClickCancel();
              }
              handleClose();
            }}
          >
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </ScrollDialogWrap>
  );
};

const ScrollDialogWrap = styled.div`
  .MuiPaper-root {
    border-radius: 10px;
  }
`;

export default ScrollDialog;
