import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import RolesListItem from "./RolesListItem";
import { fetchRoles, rolesSelector } from "../../slices/roles";
import { useEffect } from "react";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function RolesList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let { roles, fetched } = useSelector(rolesSelector);
  const classes = useStyles();

  useEffect(() => {
    !fetched && dispatch(fetchRoles(id));
  }, [dispatch, id, fetched]);

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
