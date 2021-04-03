import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchRoles, rolesSelector } from "../../slices/roles";

export default function SearchBox({ setRole }) {
  const { id } = useParams();
  const { roles, fetched } = useSelector(rolesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    !fetched && dispatch(fetchRoles(id));
  }, [dispatch, id, fetched]);

  return (
    <>
      <Autocomplete
        onChange={(event, newValue) => {
          setRole(newValue);
        }}
        id="roles"
        options={roles}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="search role" variant="outlined" />
        )}
      />
    </>
  );
}
