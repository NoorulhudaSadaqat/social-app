import React, { useState } from "react";
import { newPostMiddleware } from "../actions/Index";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function NewPost(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [post, setPost] = useState({ title: "", body: "" });
  const [flag, setFlag] = useState(true);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const modal = flag && (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <Typography variant="subtitle1" id="simple-modal-description">
          Please enter a valid data
        </Typography>
      </div>
    </Modal>
  );
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const handleNewPost = () => {
    console.log("Post :", post);
    dispatch(newPostMiddleware(post));
    if (post.title.length == 0 || post.body.length == 0) {
      handleOpen();
    } else history.push("/posts");
  };
  return (
    <div>
      <TextField
        id="filled-basic"
        label="Title"
        fullWidth
        margin="normal"
        name="title"
        onChange={handleChange}
      />
      <TextField
        id="filled-basic"
        label="Body"
        fullWidth
        name="body"
        margin="normal"
        onChange={handleChange}
      />
      <Button variant="contained" onClick={() => handleNewPost()}>
        Submit
      </Button>
      {modal}
    </div>
  );
}

export default NewPost;
