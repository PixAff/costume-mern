import { forwardRef } from "react";
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

function RoleCardTable({ script, scenes }) {
  // const dispatch = useDispatch();
  // const [scenes, setScenes] = useState([
  //   {
  //     sceneNumber: 1,
  //     mood: "I/M",
  //     place: "Vorgarten von Anna",
  //     description: "Hund bellt und Kind läuft auf Anna zu. Anna dreht sich weg",
  //     notes: "Achtung, Hund ist 1,5m groß!",
  //     cast: "Maria, Anna, Nachbarskind",
  //     continuity:
  //       "Anna hat einen Teefleck auf der Bluse, Kind hat zerrisene Hose",
  //   },
  // ]);
  // const [allRoles, setAllRoles] = useState([]);

  // const scenes = useSelector((state) => state.scenes);

  // const fetchedRoles = useSelector((state) => state.roles);
  // const scriptId = script._id;

  // useEffect(() => {
  //   setScenes(fetchedScenes);
  //   setAllRoles(fetchedRoles);
  //   console.log("fetch");
  // }, [fetchedScenes, fetchedRoles]);

  const columns = [
    { title: "id", field: "_id", hidden: true },
    {
      title: "NR",
      field: "sceneNumber",
      defaultSort: "asc",
      editable: "never",
    },

    {
      title: "Mood",
      field: "mood",
      editable: "never",
    },

    { title: "Motif", field: "place", editable: "never" },
    {
      title: "Content",
      field: "description",
      editable: "never",
    },
    {
      title: "Notes",
      field: "notes",
    },
    {
      title: "Cast",
      field: "cast",
      editable: "never",
    },
    {
      title: "Continuity",
      field: "continuity",
    },
  ];

  const handleRowUpdate = (newData, oldData, resolve) => {
    // console.log("TODO: parseInt from Material Table in the first place");
    // newData.sceneNumber = parseInt(newData.sceneNumber);
    // newData.playDay = parseInt(newData.playDay);
    // dispatch(updateScene(newData));

    resolve();
  };

  // const handleRowAdd = (newData, resolve) => {
  //   // dispatch(createScene(newData, scriptId));

  //   resolve();
  // };

  // function handleRowDelete(oldData, resolve) {
  //   // dispatch(deleteScene(oldData._id));
  //   // console.log(
  //   //   "TODO: sometimes a pagination error appears when the last item of a page gets deleted"
  //   // );
  //   // .then((res) => {
  //   //   // this is neccecary to avoid pagination error
  //   //   const scenesDelete = [...scenes];
  //   //   const index = oldData.tableData.id;
  //   //   scenesDelete.splice(index, 1);
  //   //   setScenes([...scenesDelete]);

  //   //   resolve();
  //   // });
  //   resolve();
  // }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MaterialTable
            // title={`Script - ${script.name}`}
            columns={columns}
            data={scenes}
            icons={tableIcons}
            options={{
              search: false,
              sorting: false,
              paging: false,
              addRowPosition: "first",
              showTitle: false,
              draggable: false,
              toolbar: false,
              toolbarButtonAlignment: "left",
            }}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              // onRowAdd: (newData) =>
              //   new Promise((resolve) => {
              //     handleRowAdd(newData, resolve);
              //   }),
              // onRowDelete: (oldData) =>
              //   new Promise((resolve) => {
              //     handleRowDelete(oldData, resolve);
              //   }),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default RoleCardTable;
