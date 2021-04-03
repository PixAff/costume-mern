import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IconButton, ListItemSecondaryAction } from "@material-ui/core";
import { deleteRole } from "../../slices/roles";

export default function RolesListItem({ role }) {
  const dispatch = useDispatch();

  function handleDelete(role) {
    const confirmation = window.confirm(
      "Do you really want to delete this role?"
    );
    if (confirmation) {
      dispatch(deleteRole(role._id));
    }
  }

  return (
    <ListItem
      button
      component={Link}
      to={{
        pathname: `/scripts/${role.script}/role/${role._id}`,
        state: { role },
      }}
    >
      <ListItemAvatar>
        <Avatar alt={role.name} src={role.img}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={role.name}
        secondary={role.actor || "actor unknown"}
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
  );
}
