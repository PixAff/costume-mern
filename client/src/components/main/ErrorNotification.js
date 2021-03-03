import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_ERROR } from "../../constants/actionTypes";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ErrorNotification() {
  const isOpen = useSelector((state) => state.errors.isOpen);
  const errors = useSelector((state) => state.errors.error);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch({ type: HIDE_ERROR });
  }

  return (
    <>
      {isOpen && errors && (
        <div>
          <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"An Error occured:"}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-slide-description"> */}
              {errors.map((error) => (
                <DialogContentText
                  key={error.path}
                  id="alert-dialog-slide-description"
                >
                  {error.msg}
                </DialogContentText>
              ))}
              {/* </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                CLOSE
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
