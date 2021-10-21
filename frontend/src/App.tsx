import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Lander from './pages/Lander';

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route exact path="/register">
        <Register></Register>
      </Route>
      <Route exact path="/login">
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