import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar></Navbar>
          <Home></Home>
        </Route>
        <Route exact path="/register">
          <Navbar></Navbar>
          <Register></Register>
        </Route>
        <Route exact path="/login">
          <Navbar></Navbar>
          <Login></Login>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard></Dashboard>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;