/*global chrome*/
import { createHashRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { useEffect } from 'react';
import { AppContextProvider } from './context/useappcontext';

const router = createHashRouter(routes);

function App() {
  useEffect(() => {
    getSetLocalStorage();
  }, []);
  const getSetLocalStorage = async () => {
    const { isOnBoarding } = await chrome.storage.local.get('isOnBoarding');
    const isWalletExist =
      localStorage.getItem('marvel-wallet-exist') ?? 'false';
    if (!isOnBoarding || isOnBoarding === undefined) {
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
    </AppContextProvider>
  );
}

export default App;
