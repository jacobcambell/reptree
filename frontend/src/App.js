import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Lander from './components/Lander';

const App = () => {
  return (
    <Router>
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
      <Route path="/dashboard">
        <Dashboard></Dashboard>
      </Route>
      <Route path="/leave-review/:id">
        <Lander></Lander>
      </Route>
    </Router>
  );
}

export default App;