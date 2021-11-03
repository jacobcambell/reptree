import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Lander from './pages/Lander/Lander';
import AuthContext from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthContext>
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
    </AuthContext>
  );
}

export default App;