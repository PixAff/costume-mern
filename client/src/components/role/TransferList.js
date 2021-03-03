import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRolesToScene } from "../../actions/scenes";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: 200,
    height: 360,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({ allRoles, scene, setOpen }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [right, setRight] = useState([]);
  const [left, setLeft] = useState([]);
  const alleRollen = useSelector((state) => state.roles);
  let cleanedLeft = alleRollen.filter(
    (a) => !scene.roles.map((b) => b._id).includes(a._id)
  );

  useEffect(() => {
    if (!scene.roles.length) {
      setRight([]);
    } else {
      setRight(scene.roles);
    }
    setLeft(cleanedLeft);
  }, [scene, alleRollen]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // const handleAllRight = () => {
  //   setRight(right.concat(left));
  //   setLeft([]);
  // };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleUpdate = () => {
    dispatch(addRolesToScene(scene, right));
    setOpen(false);
  };

  // const handleAllLeft = () => {
  //   setLeft(left.concat(right));
  //   setRight([]);
  // };

  const customList = (items, name) => (
    <Paper className={classes.paper}>
      {name}
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value._id}-label`;

          return (
            <ListItem
              key={value._id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText key={value._id} id={labelId} primary={value.name} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(left, "all Roles")}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          {/* <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button> */}
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          {/* <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button> */}
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            APPLY
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="secondary"
          >
            CANCEL
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right, "in the scene")}</Grid>
    </Grid>
  );
}
