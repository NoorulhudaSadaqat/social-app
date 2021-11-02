import "./App.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import ViewPost from "./components/ViewPost";
import { Switch, Route } from "react-router";
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
        <Route path="/view-post">
          <ViewPost />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
