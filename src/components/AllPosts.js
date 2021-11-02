import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allPostsMiddleware } from "../actions/Index";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function AllPosts(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in use effect");
    dispatch(allPostsMiddleware());
  }, []);
  const posts = useSelector((state) => state.posts.allPostsData);
  console.log("posts ", posts.data);
  return (
    <div>
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
    </div>
  );
}

export default AllPosts;
