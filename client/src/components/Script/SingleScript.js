import { Box } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoles } from "../../actions/roles";
import { getScenes } from "../../actions/scenes";
import MaterialTables from "../scene/MaterialTable";

export default function SingleScript() {
  const dispatch = useDispatch();
  const [script, setScript] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchScenes = async () => {
      await axios
        .get(`/scripts/${id}`)
        .then((res) => {
          setScript(res.data);
          dispatch(getScenes(res.data._id));
          dispatch(getRoles(res.data._id));
        })
        .catch((err) => console.log(err));
    };
    fetchScenes();
  }, [dispatch]);

  // const idFromWindow = window.location.pathname.substring(
  //   window.location.pathname.lastIndexOf("/") + 1
  // );

  return <Box mx={2}>{script && <MaterialTables script={script} />}</Box>;
}
