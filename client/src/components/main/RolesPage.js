import { Box } from "@material-ui/core";
import Roles from "../role/Roles";
import RoleDialog from "../role/RoleDialog";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     boxShadow: theme.shadows[1],
//   },

//   menuButton: {
//     marginRight: theme.spacing(2),
//   },

//   title: {
//     // flexGrow: 1,
//   },
// }));

export default function RolesPage() {
  //   const classes = useStyles();
  return (
    // <div className={classes.root}>

    <Box mx={2}>
      <RoleDialog />
      <Roles />

      {/* <Paper elevation={1} variant="outlined">
      </Paper> */}
    </Box>
    // </div>
  );
}
