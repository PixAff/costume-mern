import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import CostumeImgCard from "../costumes/CostumeImgCard";
import { useState } from "react";
import RoleCardTable from "./RoleCardTable";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: "90%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SingleRoleCard({ days, role, scenes }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {days.map((day) => (
        <Card key={day} className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="play day" className={classes.avatar}>
                {day}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={`Day ${day}`}
            subheader={role.name}
          />
          <CardContent>
            <CostumeImgCard />
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Hier könnte eine Kurzinfo stehen
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {/* <Typography paragraph>Method:</Typography> */}
              <RoleCardTable
                scenes={scenes.filter(({ playDay }) => playDay === day)}
              />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
}
