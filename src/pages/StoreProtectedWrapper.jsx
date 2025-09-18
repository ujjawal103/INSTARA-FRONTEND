import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { StoreDataContext } from '../context/StoreContext';

const StoreProtectedWrapper = ({ children }) => {

  const { store, setStore, isLoading, setIsLoading } = useContext(StoreDataContext);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/store-login");
    }


  axios.get(`${import.meta.env.VITE_BASE_URL}stores/profile` , {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if(response.status === 200){
        setStore(response.data.store);
        setIsLoading(false);
      }else{
        localStorage.removeItem('token');
        navigate("/store-login");
        toast.error("Store is not registered");
        setIsLoading(false);
        setStore({});
      }
      
    })
    .catch(error => {
        localStorage.removeItem('token');
        navigate("/store-login");
        toast.error("Something went wrong !");
        setIsLoading(false);
        setStore({});
    });

  }, [token, navigate]);

  if(isLoading){
    return <Loading message="Loading..." />;
  }

  return <>{children}</>;
};

export default StoreProtectedWrapper;
