import { useEffect } from "react";
import { forwardRef } from "react";
// import Avatar from 'react-avatar';
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Chip, makeStyles } from "@material-ui/core";
import RolesModal from "../role/RolesModal";
import { moods } from "../../constants/general";
import { Link, useParams } from "react-router-dom";
// import classNames from "classnames";
import {
  createScene,
  deleteScene,
  scenesSelector,
  updateScene,
} from "../../slices/scenes";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: ".9rem",
  },
  catMain: {
    Backgoundcolor: "#ff00ff",
  },
  catSupport: {
    Backgoundcolor: "#0000ff",
    margin: 20,
  },
  catExtra: {
    Backgoundcolor: "#ff0000",
  },
}));

const tableTextColor = "#777777";

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox color="secondary" {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline color="secondary" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit color="secondary" {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function MaterialTables() {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [scenes, setScenes] = useState([]);
  // const [allRoles, setAllRoles] = useState([]);
  // const fetchedScenes = useSelector(
  //   scenesSelector.sort((a, b) => a.sceneNumber - b.sceneNumber) || []
  // );
  let { scenes } = useSelector(scenesSelector);
  // TODO: this hack is neccessary since material table does not work well with immer
  // see: https://stackoverflow.com/questions/59648434/material-table-typeerror-cannot-add-property-tabledata-object-is-not-extensibl
  scenes = JSON.parse(JSON.stringify(scenes)).sort(
    (a, b) => a.sceneNumber - b.sceneNumber
  );

  useEffect(() => {
    console.log(scenes);
    // setScenes(fetchedScenes);
    // console.log("gshdgsh", fetchedScenes);
    // setAllRoles(fetchedRoles);
  }, [scenes]);

  const columns = [
    { title: "id", field: "_id", width: "0px", hidden: true },
    {
      title: "NR",
      field: "sceneNumber",
      defaultSort: "asc",
      width: "1%",

      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
        fontSize: "1rem",
        color: tableTextColor,
      },
      headerStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
      },
      sorting: false,

      validate: (rowData) =>
        /\D/.test(rowData.sceneNumber) || rowData.sceneNumber.length < 1
          ? { isValid: false, helperText: "Please enter a number!" }
          : true,
    },
    {
      title: "Day",
      field: "playDay",
      width: "1%",
      cellStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
        color: tableTextColor,
      },
      headerStyle: {
        whiteSpace: "nowrap",
        textAlign: "center",
      },
      sorting: false,

      validate: (rowData) =>
        /\D/.test(rowData.playDay) || rowData.playDay.length < 1
          ? { isValid: false, helperText: "Please enter a number!" }
          : true,
    },

    {
      title: "Mood",
      field: "mood",
      initialEditValue: "",
      sorting: false,
      lookup: moods,
    },
    {
      title: "Motif",
      field: "place",
      initialEditValue: "",
      sorting: false,
      cellStyle: {
        minWidth: 100,
        color: tableTextColor,
      },
      headerStyle: {
        minWidth: 100,
      },
    },
    {
      title: "Content",
      field: "description",
      initialEditValue: "",
      sorting: false,
    },
    {
      title: "notes",
      field: "notes",
      initialEditValue: "",
      sorting: false,
    },
    {
      title: "Cast",
      field: "roles",
      cellStyle: {
        minWidth: 320,
      },
      headerStyle: {
        minWidth: 320,
      },
      editable: "never",
      render: (rowData) => (
        <div>
          <RolesModal
            key={rowData.tableData.id}
            scene={rowData}
            // allRoles={allRoles}
          />
          {rowData.roles &&
            rowData.roles.map((role) => (
              <Chip
                style={{ margin: 2 }}
                // THIS DOES NOT WORK:
                // classes={classNames({
                //   catMain: role.category === "main",
                //   catSupport: role.category === "support",
                //   catExtra: role.category === "extra",
                // })}
                size="small"
                label={role.name}
                key={role._id}
                color={role.category === "general" ? "secondary" : "primary"}
                clickable
                variant={role.category === "main" ? "default" : "outlined"}
                component={Link}
                to={{
                  pathname: `/scripts/${id}/role/${role._id}`,
                  state: { role },
                }}
              />
            ))}
        </div>
      ),
      sorting: false,
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    // TODO: change sceneNumber to string (scene 1A, 1B, etc)
    newData.sceneNumber = parseInt(newData.sceneNumber);
    newData.playDay = parseInt(newData.playDay);
    dispatch(updateScene(newData));

    resolve();
  };

  const handleRowAdd = (newData, resolve) => {
    dispatch(createScene({ newData, id }));

    resolve();
  };

  function handleRowDelete(oldData, resolve) {
    dispatch(deleteScene(oldData._id));
    // TODO: sometimes a pagination error appears when the last item of a page gets deleted"
    // SHOULD BE FIXED WITH redux toolkit refactor
    resolve();
  }

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <MaterialTable
            title={`Script - ${"get script name here!"}`}
            columns={columns}
            data={scenes}
            // detailPanel={detailPanel}
            icons={tableIcons}
            options={{
              sorting: true,
              paging: false,
              addRowPosition: "first",
              draggable: false,
              toolbarButtonAlignment: "left",
              headerStyle: {
                backgroundColor: "#fafafa",
                fontSize: "1rem",
              },
              cellStyle: { color: tableTextColor },
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default MaterialTables;
