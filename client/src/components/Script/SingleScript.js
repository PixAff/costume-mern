import { Box } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRoles, rolesSelector } from "../../slices/roles";
import { fetchScenes, scenesSelector } from "../../slices/scenes";
import MaterialTables from "../scene/MaterialTable";

export default function SingleScript() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { scenesFetched, scriptId } = useSelector(scenesSelector);
  const rolesFetched = useSelector(rolesSelector).fetched;

  useEffect(() => {
    // TODO: do I need the Id here???
    if (!scenesFetched || id !== scriptId) dispatch(fetchScenes(id));
    if (!rolesFetched || id !== scriptId) dispatch(fetchRoles(id));
  }, [dispatch, id, scriptId, scenesFetched, rolesFetched]);

  return (
    <div>
      <Box mx={2}>{<MaterialTables />}</Box>
    </div>
  );
}
