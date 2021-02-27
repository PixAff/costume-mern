import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getScenes } from "../../actions/scenes";
import MaterialTables from "../scene/MaterialTable";

export default function SingleScript() {
  const dispatch = useDispatch();
  const [script, setScript] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/${id}`)
        .then((res) => {
          setScript(res.data);
          dispatch(getScenes(res.data._id));
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [dispatch]);

  // const idFromWindow = window.location.pathname.substring(
  //   window.location.pathname.lastIndexOf("/") + 1
  // );

  return (
    <div>
      {script && (
        <div>
          <MaterialTables script={script} />
        </div>
      )}
    </div>
  );
}
