/*global chrome*/
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { useEffect } from 'react';
import { AppContextProvider } from './context/useappcontext';
import { Toaster } from 'react-hot-toast';

const router = createHashRouter(routes);

function App() {

  useEffect(() => {
    getSetLocalStorage();
  }, []);

  const getSetLocalStorage = async () => {
    let storeData = undefined;
    if (chrome?.storage?.local) {
      storeData = await chrome.storage.local.get('isOnBoarding');
    } else {
      storeData = undefined;
    }

    const isWalletExist =
      localStorage.getItem('marvel-wallet-exist') ?? 'false';
    if (!storeData?.isOnBoarding || storeData?.isOnBoarding === undefined) {
      if (isWalletExist === 'false') {
        chrome.runtime.sendMessage({ action: 'redirect' });
        await chrome.storage.local.set({
          isOnBoarding: true,
        });
      }
    }
  };
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </AppContextProvider>
  );
}

export default App;
