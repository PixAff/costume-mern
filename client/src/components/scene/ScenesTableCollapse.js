import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import { useDispatch, useSelector } from "react-redux";
import { deleteScene } from "../../actions/scenes";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(sceneNumber, day, mood, place, content, id) {
  return {
    sceneNumber,
    day,
    mood,
    place,
    content,
    id,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const dispatch = useDispatch();

  function handleDelete(params) {
    const confirmation = window.confirm(
      "Do you really want to delete this item?"
    );
    if (confirmation) {
      // dispatch(deleteScene(script._id, scene._id));
      console.log("delete", params);
    }
  }

  return (
    <React.Fragment>
      <TableRow key={row.id} className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.sceneNumber}
        </TableCell>
        <TableCell align="center">{row.day}</TableCell>
        <TableCell align="left">{row.mood}</TableCell>
        <TableCell align="left">{row.place}</TableCell>
        <TableCell align="left">{row.content}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit row"
            size="small"
            color="primary"
            onClick={() => setOpen(!open)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="delete row"
            size="small"
            color="secondary"
            onClick={(params) => handleDelete(params)}
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Roles
              </Typography>
              <Table size="small" aria-label="roles">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                        12
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    sceneNumber: PropTypes.number.isRequired,
    day: PropTypes.number,
    mood: PropTypes.string,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    place: PropTypes.string,
    price: PropTypes.number,
    content: PropTypes.string,
  }).isRequired,
};

export default function ScenesTableCollapse() {
  const scenes = useSelector((state) => state.scenes);

  const rows = scenes.map((scene) =>
    createData(
      scene.sceneNumber,
      scene.playDay,
      scene.mood,
      "place",
      "short description about content, maybe even some more description could be here",
      scene._id
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={30} />
            <TableCell width={30} align="center">
              NR.
            </TableCell>
            <TableCell width={30} align="center">
              Day
            </TableCell>
            <TableCell align="left">Mood</TableCell>
            <TableCell align="left">Place</TableCell>
            <TableCell align="left">Content</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
