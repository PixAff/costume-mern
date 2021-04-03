import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import InfoIcon from "@material-ui/icons/Info";
// import tileData from "./tileData";
// import DeleteOutline from "@material-ui/icons/DeleteOutline";

import bike from "./images/costumeTest/bike.jpg";
import { Image } from "cloudinary-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles(() => ({
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
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.75)",
  },
  mainImage: {
    display: "flex",
    // height: "100%",
    alignItems: "center",
    minWidth: 500,
    marginRight: 4,
  },
}));

function SimpleMenu({ imageId, index, deleteImage }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    deleteImage(imageId, index);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.icon}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Galery</MenuItem>
        <MenuItem onClick={handleClose}>delete</MenuItem>
      </Menu>
    </div>
  );
}

export default function CostumeImgCard() {
  const classes = useStyles();
  const [imageIds, setImageIds] = useState();
  const { id } = useParams(); // role ID

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    // TODO: use Redux
    try {
      const res = await axios.get(`/img/${id}`);
      //   const { data } = await res.json();
      console.log(res.data);
      setImageIds(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImage = async (id, index) => {
    const imgsDelete = [...imageIds];
    try {
      const confirmation = window.confirm(
        "Do you really want to delete this image?"
      );
      if (confirmation) {
        const res = await axios.delete(`/img`, { data: { id } });
        console.log(res);
        imgsDelete.splice(index, 1);
        setImageIds([...imgsDelete]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.mainImage}>
        <img
          src={bike}
          alt="main"
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
      <>
        {imageIds && (
          <GridList cellHeight={180} cols={3} className={classes.gridList}>
            {imageIds.map((imageId, index) => (
              <GridListTile style={{ width: "270px" }} key={imageId}>
                <Image
                  // key={imageId}
                  cloudName={"pixelaffairs"}
                  publicId={imageId}
                  width={270}
                  crop="scale"
                  alt={imageId}
                />
                <GridListTileBar
                  // title="title"
                  titlePosition="top"
                  actionIcon={
                    <>
                      <SimpleMenu
                        imageId={imageId}
                        index={index}
                        deleteImage={deleteImage}
                      />
                      <IconButton
                        aria-label={`star ${"tile.title"}`}
                        className={classes.icon}
                        onClick={() => deleteImage(imageId, index)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </>
                  }
                  actionPosition="right"
                  className={classes.titleBar}
                />
              </GridListTile>
            ))}
          </GridList>
        )}
      </>
    </div>
  );
}
