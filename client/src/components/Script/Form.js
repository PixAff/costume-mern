import { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  createScript,
  scriptsSelector,
  setCurrentId,
  updateScript,
} from "../../slices/scripts";

import useStyles from "../styles";
// import { updateScript } from "../../actions/scripts";

const Form = () => {
  // TODO: refactor form to use redux (store)
  const [scriptData, setScriptData] = useState({ name: "" });
  const { currentId } = useSelector(scriptsSelector);
  const script = useSelector(scriptsSelector).scripts.find(
    (script) => script._id === currentId
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    console.log(currentId, script);
    if (script) setScriptData(script);
  }, [script, currentId]);

  const clear = () => {
    dispatch(setCurrentId(null));
    setScriptData({ name: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === null) {
      dispatch(createScript(scriptData));
      clear();
    } else {
      dispatch(updateScript({ id: currentId, script: scriptData }));
      clear();
    }
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
          <Typography variant="h6">
            {currentId ? "Edit script name" : "Create new script"}
          </Typography>
          <TextField
            className={classes.textInput}
            name="name"
            // variant="contained"
            label="Name"
            value={scriptData.name}
            onChange={(e) =>
              setScriptData({ ...scriptData, name: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            {currentId ? "Submit" : "Create"}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={clear}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
