import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './pages/private/Auth';
import Dashboard from './pages/private/Dashboard';
import Login from './pages/public/Login';
import NotFound from './pages/public/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/auth' element={<Auth />}>
          <Route path="/auth" element={<Dashboard />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
