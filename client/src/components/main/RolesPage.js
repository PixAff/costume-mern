import { Box, Paper } from "@material-ui/core";
import Roles from "../role/Roles";

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
      <Roles />
      {/* <Paper elevation={1} variant="outlined">
      </Paper> */}
    </Box>
    // </div>
  );
}
