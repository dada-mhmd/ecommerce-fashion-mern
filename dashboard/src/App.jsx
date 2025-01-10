import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/AddProduct';
import List from './pages/List';
import Orders from './pages/Orders';
import { useEffect, useState } from 'react';
import Login from './components/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route
                  path='/add'
                  element={<AddProduct setToken={setToken} token={token} />}
                />
                <Route
                  path='/list'
                  element={<List setToken={setToken} token={token} />}
                />
                <Route
                  path='/orders'
                  element={<Orders setToken={setToken} token={token} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
