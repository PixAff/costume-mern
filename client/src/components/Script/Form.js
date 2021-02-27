import { useEffect, useState } from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "../styles";
import { createScript, updateScript } from "../../actions/scripts";

const Form = ({ currentId, setCurrentId }) => {
  const [scriptData, setScriptData] = useState({ name: "" });
  const script = useSelector((state) =>
    currentId ? state.scripts.find((script) => script._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (script) setScriptData(script);
  }, [script]);

  const clear = () => {
    setCurrentId(0);
    setScriptData({ name: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createScript(scriptData));
      clear();
    } else {
      dispatch(updateScript(currentId, scriptData));
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
            {currentId ? "Edditing" : "Creating"} a script
          </Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={scriptData.name}
            onChange={(e) =>
              setScriptData({ ...scriptData, name: e.target.value })
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

export default Form;
