/* eslint-disable no-use-before-define */
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_ERROR } from "../../constants/actionTypes";
import { createRole } from "../../actions/roles";
import { useParams } from "react-router";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

export default function RoleDialog() {
  const { id } = useParams();
  console.log(id);
  const [open, setOpen] = useState(false);
  const [roleData, setRoleData] = useState({
    name: "",
    actor: "",
    notes: "",
    category: "general",
    script: id,
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    setRoleData({
      name: "",
      actor: "",
      notes: "",
      category: "general",
      script: "",
    });

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRole(roleData)).then((res) => {
      if (res.type !== SET_ERROR) {
        handleClose();
      }
    });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>ADD ROLE</Button>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a new role</DialogTitle>
          <DialogContent>
            <DialogContentText>some text here? ID: {id}</DialogContentText>
            <TextField
              autoFocus
              style={{ width: "50%" }}
              margin="normal"
              variant="outlined"
              id="name"
              placeholder="name"
              value={roleData.name}
              onChange={(e) =>
                setRoleData({ ...roleData, name: e.target.value })
              }
              label="name"
              type="text"
            />
            <TextField
              style={{ width: "50%" }}
              margin="normal"
              variant="outlined"
              id="actor"
              value={roleData.actor}
              onChange={(e) =>
                setRoleData({ ...roleData, actor: e.target.value })
              }
              label="actor"
              type="text"
            />
            <TextField
              margin="normal"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "2rem" }}
              id="notes"
              value={roleData.notes}
              onChange={(e) =>
                setRoleData({ ...roleData, notes: e.target.value })
              }
              label="notes"
              type="text"
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup
                row
                aria-label="cast"
                name="cast"
                value={roleData.category}
                onChange={(e) =>
                  setRoleData({ ...roleData, category: e.target.value })
                }
              >
                <FormControlLabel
                  value="main"
                  control={<Radio />}
                  label="Main"
                />
                <FormControlLabel
                  value="support"
                  control={<Radio />}
                  label="Support"
                />
                <FormControlLabel
                  value="extra"
                  control={<Radio />}
                  label="Extra"
                />
                <FormControlLabel
                  value="general"
                  //   disabled
                  control={<Radio />}
                  label="General (default)"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
