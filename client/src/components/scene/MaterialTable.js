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

  const columns = [
    { title: "id", field: "id", hidden: true },
    { title: "NR", field: "sceneNumber" },
    { title: "Day", field: "playDay" },
    { title: "Mood", field: "mood" },
    { title: "Place", field: "place" },
    { title: "Content", field: "content" },
    { title: "Roles", field: "roles" },
  ];

  //for error handling
  //   const [iserror, setIserror] = useState(false);
  //   const [errorMessages, setErrorMessages] = useState([]);
  const fetchedScenes = useSelector((state) => state.scenes);
  const scriptId = script._id;

  const fetchedData = fetchedScenes.map((scene) =>
    createData(
      scene.sceneNumber,
      scene.playDay,
      scene.mood,
      scene._id,
      scene.place
    )
  );

  useEffect(() => {
    setScenes(fetchedData);
    console.log("fetch");
  }, [fetchedScenes]);

  function createData(sceneNumber, playDay, mood, id, place) {
    return {
      sceneNumber,
      playDay,
      mood,
      id,
      content: "some more or less useful content showing up here",
      roles: "Peter, Paul, Marie",
      place: place || "nice Place",
    };
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    console.log("TODO: parseInt from Material Table in the first place");
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
    console.log(newData);
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
    dispatch(deleteScene(scriptId, oldData.id));
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
            title={`Script - ${script.name}`}
            columns={columns}
            data={scenes}
            icons={tableIcons}
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
