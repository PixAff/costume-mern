import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import RolesListItem from "./RolesListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function RolesList() {
  const roles = useSelector((state) => state.roles);
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {roles?.map((role) => (
        <div key={role._id}>
          <RolesListItem role={role} />
          <Divider />
        </div>
      ))}
    </List>
  );
}
