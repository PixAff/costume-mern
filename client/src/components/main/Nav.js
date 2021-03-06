import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useParams } from "react-router-dom";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "2rem",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    // flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box
            style={{ width: "100%" }}
            display="flex"
            justifyContent="flex-start"
          >
            <Box>
              <Button
                color="inherit"
                className={classes.title}
                component={Link}
                to="/"
              >
                HOME
              </Button>
            </Box>
            <Box>
              <Button
                color="inherit"
                className={classes.title}
                component={Link}
                to="/scripts"
              >
                SCRIPTS
              </Button>
            </Box>
            <Box>
              {id && (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/scripts/${id}/scenes`}
                >
                  Scenes
                </Button>
              )}
            </Box>
            <Box>
              {id && (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/scripts/${id}/roles`}
                >
                  Roles
                </Button>
              )}
            </Box>
            <Box>
              {id && (
                <Button
                  color="inherit"
                  component={Link}
                  to={`/scripts/${id}/costumes`}
                >
                  Costumes
                </Button>
              )}
            </Box>
          </Box>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
