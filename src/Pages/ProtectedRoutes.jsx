// Package
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Functions
import { MyContext } from '../ContextAPI.jsx';

function ProtectedRoutes() {
  const { SessionID } = useContext(MyContext);

  return SessionID.SessionID !== undefined ? (<Outlet />) : (<Navigate to="/" replace={true} />)
  
}

export default ProtectedRoutes;
