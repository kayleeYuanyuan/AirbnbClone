import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Navigate, Link, useParams } from 'react-router-dom'
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if(subpage === undefined) {
    subpage = 'profile';
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  function handleEdit() {
    return;
  }

  if(redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          <h2 className='font-bold text-2xl'>Personal info</h2>
          <div className="mb-2 mt-4 text-left p-4">
            <div className="text-lg font-semibold p-4">Name: &nbsp;&nbsp;&nbsp;<span id="userName">{user.name}</span></div>
            <div className="text-lg font-semibold p-4">Email: &nbsp;&nbsp;&nbsp;<span id="userEmail">{user.email}</span></div>
            <div className="text-lg font-semibold p-4">Brithday: &nbsp;&nbsp;&nbsp;<span id="userEmail">{user.email}</span></div>
            <div className="text-lg font-semibold p-4">Phone: &nbsp;&nbsp;&nbsp;<span id="userEmail">{user.email}</span></div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button 
              onClick={handleEdit} 
              className="primary max-w-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button 
              onClick={logout} 
              className="primary max-w-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  )
}
