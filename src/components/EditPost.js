import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { specificPostMiddleware, editPostMiddleware } from "../actions/Index";
import FilledInput from "@mui/material/FilledInput";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { minWidth } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: "700",
    margin: "20, 20, 20, 20",
  },
}));

function EditPost(props) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [postValue, setPostValue] = useState({});

  var id, titleValue, bodyValue;
  useEffect(() => {
    const url = history.location.pathname.split(":");
    id = url[1];
    dispatch(specificPostMiddleware(id));
  }, []);
  useEffect(() => {
    setPostValue(post);
  }, [post]);
  const handleChange = (e) => {
    setPostValue({
      ...postValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditPost = () => {
    console.log(
      " post title : ",
      postValue.title,
      "post body :",
      postValue.body
    );
    const post = { title: postValue.title, body: postValue.body };
    dispatch(editPostMiddleware(id, post));
    history.push("/posts");
  };

  return (
    <div>
      <TextField
        id="filled-basic"
        label="Title"
        fullWidth
        margin="normal"
        name="title"
        value={postValue.title}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="filled-basic"
        label="Body"
        fullWidth
        name="body"
        margin="normal"
        value={postValue.body}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <DoneIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={() => handleEditPost()}>
        Submit
      </Button>
    </div>
  );
}

export default EditPost;
