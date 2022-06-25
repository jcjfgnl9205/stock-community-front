import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { UserContext } from '../../context/UserContext';

const NotFound = () => {

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="text-center">
      <h2>404</h2>
      <p>Not Found</p>
    </div>
  );
}

export default React.memo(NotFound);
