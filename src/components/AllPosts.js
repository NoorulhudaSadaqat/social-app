import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPostsMiddleware } from "../actions/Index";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function AllPosts(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in use effect");
    dispatch(allPostsMiddleware("forward"));
  }, []);
  const posts = useSelector((state) => state.posts.allPostsData);
  return (
    <div>
      {console.log("posts ", posts)}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              All posts
            </Typography>
            <Button color="inherit">Logout</Button>
            <Button color="inherit">New Post</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {posts.map((post) => {
          return (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                    {console.log("in avatar")}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={post.title} secondary={post.body} />
              </ListItem>
              <ListItem>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton edge="end" aria-label="edit">
                  <ModeEditIcon />
                </IconButton>
              </ListItem>
            </List>
          );
        })}
      </List>
      <IconButton
        edge="end"
        onClick={() => dispatch(allPostsMiddleware("backward"))}
        aria-label="arrowback"
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton
        edge="end"
        onClick={() => dispatch(allPostsMiddleware("forward"))}
        aria-label="arrowforward"
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );
}

export default AllPosts;
