import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { DELETE_ROLE } from "../../constants/actionTypes";
import { deleteRole } from "../../actions/roles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Roles() {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles);
  const classes = useStyles();

  function handleDelete(role) {
    const confirmation = window.confirm(
      "Do you really want to delete this item?"
    );
    if (confirmation) {
      dispatch(deleteRole(role._id));
    }
  }

  return (
    <List className={classes.root}>
      {roles?.map((role) => (
        <div key={role._id}>
          <ListItem button component={Link} to="/">
            <ListItemAvatar>
              <Avatar alt={role.name} src={role.img}></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={role.name}
              secondary={role.actor || "unknown"}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(role)}
              >
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}
