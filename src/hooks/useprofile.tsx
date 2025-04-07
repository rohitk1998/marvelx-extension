import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../helpers/common/api.helper';

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
      const response = await getProfile(walletAddress);
      console.log("getProfile",response)
      if(response === false){
        toast.error('Error fecthing profile');
        setTimeout(()=> {
          localStorage.clear();
          navigate('/')
        },2000)
      }
      setUser(response?.data?.response?.data);
    } catch (err :any ) {
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
