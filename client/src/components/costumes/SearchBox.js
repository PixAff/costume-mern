import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchBox({ setRole }) {
  const roles = useSelector((state) => state.roles);

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
