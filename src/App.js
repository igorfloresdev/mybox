import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './Pages/Private/Dashboard';
import Login from './Pages/Public/Login';
import NotFound from './Pages/Public/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
