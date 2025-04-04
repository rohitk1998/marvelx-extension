import { useState, useEffect } from "react";
import {getAccountTokens} from "../helpers/solana/api.helper";

const useTokenBalance = () => {
    const [tokens, setTokens] = useState([]);
    const [usdbal, setUsdBal] = useState(0);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [address,setAddress]=useState('');
    const [selectedNetwork,setSelectedNetwork]:any=useState(localStorage.getItem('network'));

    useEffect(() => {
        if(address !== '' && selectedNetwork !== '' && tokens.length === 0){
            fetchTokenAndBalance();
        }
    }, [address,selectedNetwork]);

    const fetchTokenAndBalance = async()=> {
        setLoading(true);
        setError(null);
        try {
            const { tokens: tokenlist, balance : nativeBalance } = await getAccountTokens(address,selectedNetwork);
            setTokens(tokenlist);
            setBalance(nativeBalance);
            const totalUsdbal = tokenlist.reduce(
                (sum: number, item: any) => Number(sum) + Number(item.usdbal),
                0
              );
            setUsdBal(totalUsdbal);
        } catch (err:any) {
            setError(err.message || "Failed to fetch balance");
        } finally {
            setLoading(false);
        }
    }

    return { tokens, usdbal, loading, error,setAddress,setSelectedNetwork,balance };
};

export default useTokenBalance;