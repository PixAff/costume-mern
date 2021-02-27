import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteScript, likeScript } from "../../actions/scripts";

export default function Script({ script, setCurrentId }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleDelete() {
    const confirmation = window.confirm(
      "Do you really want to delete this item?"
    );
    if (confirmation) {
      dispatch(deleteScript(script._id));
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className="">
          <Typography variant="h6" style={{ color: "green" }}>
            <Link to={`/scripts/${script._id}`} idse="test" className="item">
              {script.name}
            </Link>
          </Typography>
          <Typography variant="body2" style={{ color: "red" }}>
            {moment(script.created).fromNow()}
          </Typography>
        </div>
      </CardContent>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "red" }}
          size="small"
          onClick={() => setCurrentId(script._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likeScript(script._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like {script.liked}
        </Button>
        <Button size="small" color="primary" onClick={() => handleDelete()}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
