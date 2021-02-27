import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";

const columns = [
  {
    field: "",
    headerName: "",
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    renderCell: (params: CellParams) => {
      const onClick = () => {
        const api: GridApi = params.api;
        const fields = api
          .getAllColumns()
          .map((c) => c.field)
          .filter((c) => c !== "__check__" && !!c);
        const thisRow = {};

        fields.forEach((f) => {
          thisRow[f] = params.getValue(f);
        });

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return (
        <Button onClick={onClick}>
          <EditIcon />
        </Button>
      );
    },
  },
  { field: "sceneNumber", headerName: "NR", type: "number", width: 90 },
  { field: "playDay", headerName: "Day", type: "number", width: 90 },
  { field: "mood", headerName: "Mood", width: 130, sortable: false },
];

// const rows = [
//   { id: 1, sceneNumber: 1, playDay: 1, mood: "Jon" },
//   { id: 2, sceneNumber: 2, playDay: 1, mood: "Cersei" },
//   { id: 3, sceneNumber: 3, playDay: 1, mood: "Jaime" },
//   { id: 4, sceneNumber: 4, playDay: 1, mood: "Arya" },
//   { id: 5, sceneNumber: 5, playDay: 1, mood: "Daenerys" },
//   { id: 6, sceneNumber: 6, playDay: 1, mood: null },
//   { id: 7, sceneNumber: 7, playDay: 1, mood: "Ferrara" },
//   { id: 8, sceneNumber: 8, playDay: 1, mood: "Rossini" },
//   { id: 9, sceneNumber: 9, playDay: 1, mood: "Harvey" },
// ];

export default function ScenesTable() {
  const scenes = useSelector((state) => state.scenes);
  console.log(scenes);

  const rows = scenes.map((scene) => ({
    id: scene._id,
    sceneNumber: scene.sceneNumber,
    playDay: scene.playDay,
    mood: scene.mood,
  }));

  console.log(rows);

  return (
    <div style={{ height: 600, width: "100%", background: "white" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableColumnMenu
        onRowSelected={(test) => console.log(test.data)}
      />
    </div>
  );
}
