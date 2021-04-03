import React from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import SingleRoleCard from "./SingleRoleCard";
import { useParams } from "react-router";
import { scenesSelector } from "../../slices/scenes";

export default function SingleRole(props) {
  console.log(props);
  const par = useParams();
  console.log(par);

  const { role } = props.location.state;

  const { scenes } = useSelector(scenesSelector);

  const filteredScenes = scenes.filter((scene) => {
    return scene.roles.some((rolee) => rolee._id === role._id);
  });

  console.log(filteredScenes);
  let dayArray = [];
  filteredScenes.forEach((key) => dayArray.push(key.playDay));

  dayArray = [...new Set(dayArray)].sort((a, b) => a - b); // filters out duplicates and sorts
  console.log({ dayArray, role });

  return (
    <Box mx={2}>
      <SingleRoleCard days={dayArray} role={role} scenes={filteredScenes} />
    </Box>
  );
}
