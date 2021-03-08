import { useState, useEffect } from "react";
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
import { createScene, deleteScene, updateScene } from "../../actions/scenes";
import { Button, Chip, makeStyles } from "@material-ui/core";
import RolesModal from "../role/RolesModal";
import { moods } from "../../constants/general";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: ".9rem",
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

function MaterialTables({ script }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [scenes, setScenes] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const fetchedScenes = useSelector((state) =>
    state.scenes.sort((a, b) => a.sceneNumber - b.sceneNumber)
  );
  const fetchedRoles = useSelector((state) => state.roles);
  const scriptId = script._id;

  useEffect(() => {
    setScenes(fetchedScenes);
    setAllRoles(fetchedRoles);
    console.log("fetch");
  }, [fetchedScenes, fetchedRoles]);

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
      sorting: false,
      lookup: moods,
    },
    {
      title: "Motif",
      field: "place",
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
      sorting: false,
      // cellStyle: {
      //   minWidth: 400,
      // },
      // headerStyle: {
      //   minWidth: 400,
      // },
    },
    {
      title: "notes",
      field: "notes",
      sorting: false,
      // cellStyle: {
      //   minWidth: 300,
      // },
      // headerStyle: {
      //   minWidth: 300,
      // },
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
            allRoles={allRoles}
          />
          {rowData.roles &&
            rowData.roles.map((role) => (
              <Chip
                style={{ margin: 2 }}
                size="small"
                label={role.name}
                key={role._id}
                color="primary"
                clickable
                variant="outlined"
                component={Link}
                to={{
                  pathname: `/scripts/${role.script}/role/${role._id}`,
                  state: { role },
                }}
              />
            ))}
        </div>
      ),
      sorting: false,
    },
  ];

  // const detailPanel = [
  //   {
  //     tooltip: "ROLES",
  //     icon: tableIcons.DetailPanel,
  //     render: (rowData) => {
  //       return (
  //         <Grid
  //           container
  //           style={{
  //             fontSize: 16,
  //             textAlign: "center",
  //             color: "white",
  //             backgroundColor: "#AAAAAA",
  //           }}
  //         >
  //           <Grid item xs={1}>
  //             <RolesModal
  //               key={rowData.tableData.id}
  //               scene={rowData}
  //               allRoles={allRoles}
  //             />
  //           </Grid>
  //           <Grid item xs={11}>
  //             <div>
  //               {rowData.roles &&
  //                 rowData.roles.map((role) => (
  //                   <Chip
  //                     label={role.name}
  //                     key={role._id}
  //                     color="primary"
  //                     clickable
  //                     variant="outlined"
  //                   />
  //                 ))}
  //             </div>
  //           </Grid>
  //         </Grid>
  //       );
  //     },
  //   },
  // ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    // console.log("TODO: parseInt from Material Table in the first place");
    newData.sceneNumber = parseInt(newData.sceneNumber);
    newData.playDay = parseInt(newData.playDay);
    dispatch(updateScene(newData));

    resolve();
  };

  const handleRowAdd = (newData, resolve) => {
    dispatch(createScene(newData, scriptId));

    resolve();
  };

  function handleRowDelete(oldData, resolve) {
    dispatch(deleteScene(oldData._id));
    console.log(
      "TODO: sometimes a pagination error appears when the last item of a page gets deleted"
    );
    // .then((res) => {
    //   // this is neccecary to avoid pagination error
    //   const scenesDelete = [...scenes];
    //   const index = oldData.tableData.id;
    //   scenesDelete.splice(index, 1);
    //   setScenes([...scenesDelete]);

    //   resolve();
    // });
    resolve();
  }

  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <MaterialTable
            title={`Script - ${script.name}`}
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
