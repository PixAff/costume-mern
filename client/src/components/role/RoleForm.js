import { useState } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "../styles";
import { createRole } from "../../actions/roles";

const RoleForm = ({ scene }) => {
  const [roleData, setRoleData] = useState({
    name: "",
    actor: "",
    notes: "",
    script: scene.script._id,
  });

  const dispatch = useDispatch();
  const classes = useStyles();

  //   useEffect(() => {
  //     if (role) setRoleData(role);
  //   }, [role]);

  const clear = () => {
    // setCurrentId(0);
    setRoleData({ name: "", actor: "", notes: "", script: scene.script._id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRole(roleData));
    clear();
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.form} ${classes.root}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">creating a role</Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={roleData.name}
            onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
          />
          <TextField
            name="actor"
            variant="outlined"
            label="Actor"
            fullWidth
            value={roleData.actor}
            onChange={(e) =>
              setRoleData({ ...roleData, actor: e.target.value })
            }
          />
          <TextField
            name="notes"
            variant="outlined"
            label="Notes"
            fullWidth
            value={roleData.notes}
            onChange={(e) =>
              setRoleData({ ...roleData, notes: e.target.value })
            }
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default RoleForm;
