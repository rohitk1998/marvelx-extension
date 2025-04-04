import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/index';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useUserProfile = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate=useNavigate();

  const fetchUserProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(API_URL.profile + `/${walletAddress}`);
      setUser(response?.data?.user);
    } catch (err :any ) {
      if(err?.response?.data?.message === 'User not found'){
        toast.error('wallet not found');
        setTimeout(()=> {
          localStorage.clear();
          navigate('/')
        },2000)
      }
      setError('Error fetching user profile');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!walletAddress) return; 
    fetchUserProfile();
    setTimeout(()=>{
      setWalletAddress('');
    },1000)
  }, [walletAddress]);

  return { user, loading, error, setWalletAddress };
};

export default useUserProfile;
