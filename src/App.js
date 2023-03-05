import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/public/Login';
import NotFound from './pages/public/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
