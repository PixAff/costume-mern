import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";

import bike from "./images/costumeTest/bike.jpg";
import hats from "./images/costumeTest/hats.jpg";
import camera from "./images/costumeTest/camera.jpg";
import morning from "./images/costumeTest/morning.jpg";
import breakfast from "./images/costumeTest/breakfast.jpg";
import burgers from "./images/costumeTest/burgers.jpg";
import vegetables from "./images/costumeTest/vegetables.jpg";
import honey from "./images/costumeTest/honey.jpg";
import ImageUpload from "./ImageUpload";
import AllImages from "./AllImages";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    // flexWrap: "wrap",
    justifyContent: "left",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fbfbfb",
  },
  gridList: {
    flexWrap: "wrap",
    // overflow: "scroll",

    // width: 800,
    height: 368,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  mainImage: {
    display: "flex",
    // height: "100%",
    alignItems: "center",
    minWidth: 500,
    marginRight: 4,
  },
}));

// *
//  * The example data is structured as follows:
//  *
//  * import image from 'path/to/image.jpg';
//  * [etc...]
//  *
const tileData = [
  {
    img: bike,
    title: "Bike",
    author: "Stefan",
  },
  {
    img: hats,
    title: "hats",
    author: "Stefan",
  },
  {
    img: camera,
    title: "camera",
    author: "Stefan",
  },
  {
    img: morning,
    title: "morning",
    author: "Stefan",
  },
  {
    img: honey,
    title: "honey1",
    author: "Stefan",
  },
  {
    img: vegetables,
    title: "vegetables1",
    author: "Stefan",
  },
  {
    img: breakfast,
    title: "breakfast1",
    author: "Stefan",
  },
  {
    img: burgers,
    title: "burgers",
    author: "Stefan",
  },
];

export default function CostumeImgCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageUpload />
      <AllImages />
      <div className={classes.mainImage}>
        <img
          src={bike}
          alt="main"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
      <GridList cellHeight={180} cols={3} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile> */}
        {tileData.map((tile) => (
          <GridListTile style={{ width: "270px" }} key={tile.title}>
            {/* <div style={{ width: "270px" }}> */}
            <img
              src={tile.img}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              alt={tile.title}
            />
            {/* </div> */}

            <GridListTileBar
              title={tile.title}
              // subtitle={<span>by: {tile.author}</span>}
              // actionIcon={
              // <IconButton
              // aria-label={`info about ${tile.title}`}
              // className={classes.icon}
              // toolTip={`info about ${tile.title}`}
              // >
              // <InfoIcon />
              // </IconButton>
              // }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
