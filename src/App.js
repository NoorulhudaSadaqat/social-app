import "./App.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import EditPost from "./components/EditPost";
import { Switch, Route } from "react-router";
import NewPost from "./components/NewPost";
function App() {
  const isLoggedIn = useSelector((state) => state.posts.isLoggedIn);
  const history = useHistory();
  if (isLoggedIn) {
    history.push("/posts");
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/posts">
          <AllPosts />
        </Route>
        <Route path="/edit-post">
          <EditPost />
        </Route>
        <Route path="/new-post">
          <NewPost />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
