import { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "../styles";
import { createRole } from "../../actions/roles";
import { SET_ERROR } from "../../constants/actionTypes";

const RoleForm = ({ scene }) => {
  // TODO: Sometimes the script is not beeing populated with scene (workaround:
  // conditional setting of script)
  console.log("RoleForm", scene.script);

  const [roleData, setRoleData] = useState({
    name: "",
    actor: "",
    notes: "",
    category: "general",
    script: scene.script._id || scene.script,
  });

  const dispatch = useDispatch();
  const classes = useStyles();

  const clear = () => {
    setRoleData({
      name: "",
      actor: "",
      notes: "",
      category: "general",
      script: scene.script._id || scene.script,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRole(roleData)).then((res) => {
      if (res.type !== SET_ERROR) {
        clear();
      }
    });
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
              <FormControlLabel value="main" control={<Radio />} label="Main" />
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
                disabled
                control={<Radio />}
                label="General (default)"
              />
            </RadioGroup>
          </FormControl>
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
