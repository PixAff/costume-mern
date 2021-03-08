import React from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import SingleRoleCard from "./SingleRoleCard";

export default function SingleRole(props) {
  const { role } = props.location.state;

  const scenes = useSelector((state) =>
    state.scenes.filter((scene) => {
      return scene.roles.some((rolee) => rolee._id === role._id);
    })
  );
  console.log(scenes);
  let dayArray = [];
  scenes.forEach((key) => dayArray.push(key.playDay));

  dayArray = [...new Set(dayArray)].sort((a, b) => a - b); // filters out duplicates and sorts
  console.log({ dayArray, role });

  return (
    <Box mx={2}>
      <SingleRoleCard days={dayArray} role={role} scenes={scenes} />
    </Box>
  );
}
