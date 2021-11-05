import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  allPostsMiddleware,
  deletePostMiddleware,
  viewCommentsMiddleware,
} from "../actions/Index";
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

import { useHistory } from "react-router";
import { formLabelClasses } from "@mui/material";

function AllPosts(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => state.posts.allPostsData);
  const commentsFromRedux = useSelector((state) => state.posts.comments);
  const [postArray, setPostArray] = useState(posts);
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const newPost = () => {
    console.log("in new post");
    history.push("/new-post");
  };
  const handleClick = (id) => {
    setOpen(!open);
    dispatch(viewCommentsMiddleware(id));
    setComments(commentsFromRedux);
    console.log("comments :", comments);
  };
  useEffect(() => {
    dispatch(allPostsMiddleware("forward"));
  }, []);
  useEffect(() => {
    setPostArray(posts);
  }, [posts]);
  const handleEdit = (id) => {
    history.push(`/edit-post/:${id}`);
  };
  const handleDelete = (post) => {
    const arrs = [...postArray];
    const index = arrs.indexOf(post);
    console.log(index, post);
    if (index > -1) {
      const arr = arrs.splice(index, 1);
      console.log("arr", arrs);
    }
    setPostArray(arrs);
    console.log("remaining posts :", postArray);
    dispatch(deletePostMiddleware(post.id));
  };

  return (
    <div>
      {console.log("posts ", postArray)}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              All posts
            </Typography>
            <Button color="inherit">Logout</Button>
            <Button color="inherit" onClick={() => newPost()}>
              New Post
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {postArray.map((post) => {
          return (
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={post.title} secondary={post.body} />
              </ListItem>
              <ListItem>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(post)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleEdit(post.id)}
                  aria-label="edit"
                >
                  <ModeEditIcon />
                </IconButton>
              </ListItem>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Comments" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {console.log("comments length :", comments.length)}
                  {comments.map((comment) => {
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={comment} />
                    </ListItemButton>;
                  })}
                </List>
              </Collapse>
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
