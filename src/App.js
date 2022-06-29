import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import RegisterForm from './RegisterForm';
import FinanceProfile from './FinanceProfile';
import PersonalProfile from './PersonalProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/registerform" element={<RegisterForm />} />
          <Route exact path="/financeprofile" element={<FinanceProfile />} />
          <Route exact path="/personalprofile" element={<PersonalProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
