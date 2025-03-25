import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/index';

const useUserProfile = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(API_URL.profile + `/${walletAddress}`);
      setUser(response?.data?.user);
    } catch (err :any ) {
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
