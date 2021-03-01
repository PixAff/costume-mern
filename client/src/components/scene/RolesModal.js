import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import TransferList from "./TransferList";
import RoleForm from "../role/RoleForm";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  addButton: {
    backgroundColor: "green",
    "&:hover": {
      background: "darkolivegreen",
    },
  },
}));

export default function RolesModal({ scene }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    console.log("UPDATE");
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Scene Nr: {scene.sceneNumber}</h2>
      <TransferList />
      <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={handleUpdate}>APPLY</Button>
        <Button className={classes.addButton} onClick={handleUpdate}>
          ADD
        </Button>
        <Button onClick={handleClose} color="secondary">
          CANCEL
        </Button>
      </ButtonGroup>
      <RoleForm scene={scene} />
    </div>
  );

  return (
    <div>
      <Tooltip title="Edit Roles">
        <Button
          size="small"
          color="secondary"
          aria-label="edit"
          onClick={handleOpen}
        >
          <Edit />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
