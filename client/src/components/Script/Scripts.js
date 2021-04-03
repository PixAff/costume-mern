import { Box, CircularProgress, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TheButton from "../pdf/PdfTest";
import useStyles from "../styles";

import { fetchScripts, scriptsSelector } from "../../slices/scripts";

import ScriptCard from "./ScriptCard";
import { resetScenes } from "../../slices/scenes";
import { resetRoles } from "../../slices/roles";

export default function Scripts({ setCurrentId }) {
  const { scripts, loading, hasErrors } = useSelector(scriptsSelector);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetScenes());
    dispatch(resetRoles());
    if (!scripts.length) {
      dispatch(fetchScripts());
      console.log("Scripts");
    }
  }, [dispatch, scripts]);

  const renderScripts = () => {
    if (loading) return <CircularProgress />;
    if (hasErrors) return <p>Something went wrong</p>;

    return scripts.map((script) => (
      <Grid key={script._id} item xs={12}>
        <ScriptCard script={script} setCurrentId={setCurrentId} />
      </Grid>
    ));
  };

  return (
    <Grid
      className={classes.container}
      container
      justify="center"
      alignItems="stretch"
      spacing={3}
    >
      {renderScripts()}
      <Box mx={2}>
        <TheButton script={scripts} />
      </Box>
    </Grid>
  );
}
