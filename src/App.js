import {
  BrowserRouter as Router, Routes,
  Route,
} from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import AdminPage from './pages/adminPage';
import UserPage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/*" element={<UserPage />} />
        <Route
          path="/admin/*"
          element={(
            <PrivateRoutes type="admin">
              <AdminPage />
            </PrivateRoutes>
)}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
