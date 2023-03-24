import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/private/About';
import Auth from './pages/private/Auth';
import Categories from './pages/private/Categories';
import Dashboard from './pages/private/Dashboard';
import Products from './pages/private/Products';
import Login from './pages/public/Login';
import NotFound from './pages/public/NotFound';



function App() {
  return (
    <Router>
      <div>
        <Toaster
          toastOptions={{
            style: {
              background: '#1b1b1b',
              color: '#ffffff'
            }
          }}
        />
      </div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/auth' element={<Auth />}>
          <Route path="/auth/dashboard" element={<Dashboard />} />
          <Route path="/auth/products" element={<Products />} />
          <Route path="/auth/categories" element={<Categories />} />
          <Route path="/auth/about" element={<About />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
