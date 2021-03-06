import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Chip, Tooltip } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import TransferList from "./TransferList";
import RoleForm from "../role/RoleForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: 100,
    top: 20,
  },
  addButton: {
    backgroundColor: "green",
    "&:hover": {
      background: "darkolivegreen",
    },
  },
}));

export default function RolesModal({ scene, allRoles }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={`${classes.paper} `}>
      <h2 id="simple-modal-title">Scene Nr: {scene.sceneNumber}</h2>
      <TransferList allRoles={allRoles} scene={scene} setOpen={setOpen} />
      {/* <ButtonGroup disableElevation variant="contained" color="primary">
        <Button onClick={handleUpdate}>APPLY</Button>
        <Button className={classes.addButton} onClick={handleUpdate}>
          ADD
        </Button>
        <Button onClick={handleClose} color="secondary">
          CANCEL
        </Button>
      </ButtonGroup> */}
      <RoleForm scene={scene} />
    </div>
  );

  return (
    <div>
      <Tooltip title="Edit Roles">
        <Chip
          style={{ margin: 2 }}
          size="small"
          color="secondary"
          aria-label="edit"
          label="edit"
          onClick={handleOpen}
          // variant="outlined"
          // clickable
        >
          {/* <Edit /> */}
        </Chip>
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
