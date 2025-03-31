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
      console.log("response",response)
      setUser(response?.data?.user);
    } catch (err :any ) {
      console.log("err",err)
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
    if (!walletAddress) return; // Skip fetch if no wallet address
    fetchUserProfile();
    setTimeout(()=>{
      setWalletAddress('');
    },1000)
    console.log('address in user profile hook:',walletAddress)
  }, [walletAddress]); // Re-run effect when walletAddress changes

  return { user, loading, error, setWalletAddress };
};

export default useUserProfile;
