// THIS FILE IS ONLY KEPT AS REFERENCE TO THE ORIGINAL MATERIAL TABLE

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
import { Button } from "@material-ui/core";
import RolesModal from "../role/RolesModal";
import { moods } from "../../constants/general";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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
  const dispatch = useDispatch();
  const [scenes, setScenes] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const fetchedScenes = useSelector((state) => state.scenes);
  const fetchedRoles = useSelector((state) => state.roles);
  const scriptId = script._id;

  useEffect(() => {
    setScenes(fetchedScenes);
    setAllRoles(fetchedRoles);
    console.log("fetch");
  }, [fetchedScenes, fetchedRoles]);

  const columns = [
    { title: "id", field: "_id", hidden: true },
    {
      title: "NR",
      field: "sceneNumber" || "",
      defaultSort: "asc",
      validate: (rowData) =>
        /\D/.test(rowData.sceneNumber) || rowData.sceneNumber.length < 1
          ? { isValid: false, helperText: "Please enter a number!" }
          : true,
    },
    {
      title: "Day",
      field: "playDay",
      cellStyle: {
        maxWidth: 20,
        width: 20,
      },
      headerStyle: {
        maxWidth: 20,
        width: 20,
      },
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
    { title: "Motif", field: "place", sorting: false },
    {
      title: "Content",
      field: "description",
      sorting: false,
      cellStyle: {
        minWidth: 400,
      },
      headerStyle: {
        minWidth: 400,
      },
    },
    {
      title: "notes",
      field: "notes",
      sorting: false,
      cellStyle: {
        minWidth: 300,
      },
      headerStyle: {
        minWidth: 300,
      },
    },
  ];

  const detailPanel = [
    {
      tooltip: "ROLES",
      icon: tableIcons.DetailPanel,
      render: (rowData) => {
        return (
          <Grid
            container
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "white",
              backgroundColor: "#AAAAAA",
            }}
          >
            <Grid item xs={1}>
              <RolesModal
                key={rowData.tableData.id}
                scene={rowData}
                allRoles={allRoles}
              />
            </Grid>
            <Grid item xs={11}>
              <div>
                {rowData.roles &&
                  rowData.roles.map((role) => (
                    <Button key={role._id} color="inherit">
                      {role.name}
                    </Button>
                  ))}
              </div>
            </Grid>
          </Grid>
        );
      },
    },
    // {
    //   icon: "favorite_border",
    //   openIcon: "favorite",
    //   tooltip: "Show Both",
    //   render: (rowData) => {
    //     return (
    //       <div
    //         style={{
    //           fontSize: 16,
    //           textAlign: "center",
    //           color: "white",
    //           backgroundColor: "#FDD835",
    //         }}
    //       >
    //         {rowData.id} {rowData.mood}
    //       </div>
    //     );
    //   },
    // },
  ];

  //for error handling
  //   const [iserror, setIserror] = useState(false);
  //   const [errorMessages, setErrorMessages] = useState([]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    // console.log("TODO: parseInt from Material Table in the first place");
    newData.sceneNumber = parseInt(newData.sceneNumber);
    newData.playDay = parseInt(newData.playDay);
    dispatch(updateScene(newData));
    //validation
    //   let errorList = [];
    //   if (newData.first_name === "") {
    //     errorList.push("Please enter first name");
    //   }
    //   if (newData.last_name === "") {
    //     errorList.push("Please enter last name");
    //   }
    //   if (newData.email === "" || validateEmail(newData.email) === false) {
    //     errorList.push("Please enter a valid email");
    //   }

    //   if (errorList.length < 1) {
    //     api
    //       .patch("/users/" + newData.id, newData)
    //       .then((res) => {
    //         const dataUpdate = [...data];
    //         const index = oldData.tableData.id;
    //         dataUpdate[index] = newData;
    //         setData([...dataUpdate]);
    //         resolve();
    //         setIserror(false);
    //         setErrorMessages([]);
    //       })
    //       .catch((error) => {
    //         setErrorMessages(["Update failed! Server error"]);
    //         setIserror(true);
    //         resolve();
    //       });
    //   } else {
    //     setErrorMessages(errorList);
    //     setIserror(true);
    resolve();
    //   }
  };

  const handleRowAdd = (newData, resolve) => {
    //     //validation
    let errorList = [];
    //     if (newData.first_name === undefined) {
    //       errorList.push("Please enter first name");
    //     }
    //     if (newData.last_name === undefined) {
    //       errorList.push("Please enter last name");
    //     }
    //     if (newData.email === undefined || validateEmail(newData.email) === false) {
    //       errorList.push("Please enter a valid email");
    //     }

    if (errorList.length < 1) {
      //no error
      dispatch(createScene(newData, scriptId));
    }
    //       api
    //         .post("/users", newData)
    //         .then((res) => {
    //           let dataToAdd = [...data];
    //           dataToAdd.push(newData);
    //           setData(dataToAdd);
    //           resolve();
    //           setErrorMessages([]);
    //           setIserror(false);
    //         })
    //         .catch((error) => {
    //           setErrorMessages(["Cannot add data. Server error!"]);
    //           setIserror(true);
    //           resolve();
    //         });
    //     } else {
    //       setErrorMessages(errorList);
    //       setIserror(true);
    resolve();
    //     }
  };

  //   const handleRowDelete = (oldData, resolve) => {
  //     api
  //       .delete("/users/" + oldData.id)
  //       .then((res) => {
  //         const dataDelete = [...data];
  //         const index = oldData.tableData.id;
  //         dataDelete.splice(index, 1);
  //         setData([...dataDelete]);
  //         resolve();
  //       })
  //       .catch((error) => {
  //         setErrorMessages(["Delete failed! Server error"]);
  //         setIserror(true);
  //         resolve();
  //       });
  //   };

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
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div> */}
          <MaterialTable
            actions={[
              {
                icon: "add",
                tooltip: "Add User",
                isFreeAction: true,
                onClick: (event) => alert("You want to add a new row"),
              },
            ]}
            title={`Script - ${script.name}`}
            columns={columns}
            data={scenes}
            detailPanel={detailPanel}
            icons={tableIcons}
            options={{
              sorting: true,
              paging: false,
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
    </div>
  );
}

export default MaterialTables;
