import { Box, List } from "@material-ui/core";
import { useState } from "react";
import CostumeDialog from "../costumes/CostumeDialog";
import SearchBox from "../costumes/SearchBox";
import RolesListItem from "../role/RolesListItem";

export default function CostumesPage() {
  const [role, setRole] = useState();
  return (
    <Box mx={2}>
      <SearchBox setRole={setRole} />
      <List>{role && <RolesListItem role={role} />}</List>
      {role && <CostumeDialog role={role} />}
    </Box>
  );
}
