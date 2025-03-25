import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  password:string;
  confirmpassword:string;
  wallet:any;
  secretphrase:string;
  setPassword:Function;
  setConfirmPassword:Function;
  setWallet:Function;
  setSecretPhrase:Function;
  mnemonicsArr:string[];
  setMnemonicsArr:Function;
  setPrivateKey:Function;
  privatekey:string;
  privatekeyarr:Array<any>;
  setPrivateKeyArr:Function;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [password, setPassword] = useState<any>('');
  const [confirmpassword, setConfirmPassword] = useState<any>('');
  const [wallet, setWallet] = useState<any>(null);
  const [secretphrase, setSecretPhrase] = useState<any>('');
  const [mnemonicsArr, setMnemonicsArr] = useState<any>('');
  const [privatekey, setPrivateKey] = useState<any>('');
  const [privatekeyarr, setPrivateKeyArr] = useState<any>('');

  return (
    <AppContext.Provider value={{ password,confirmpassword,wallet,secretphrase,setPassword,setConfirmPassword,setWallet,setSecretPhrase,mnemonicsArr,setMnemonicsArr,setPrivateKey,privatekey,setPrivateKeyArr,privatekeyarr }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
