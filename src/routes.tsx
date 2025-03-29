import {
  Splash,
  AddWallet,
  RecoverWallet,
  CreateWallet,
  WalletBoard,
  RecoverByPhrase,
  Send,
  EditAccount,
  TwoFactorAuthenticator,
  SecurityAndPrivacy
} from './components/index';
import OnBoardingLayout from './components/onboarding-layout';
import PublicRoute from './publicroute';
import PrivateRoute from './privateroute';
import Receive from './components/receive';
import Settings from './components/settings';
import RecoveryPhrase from './components/show-secret';
import PrivateKeyDisplay from './components/show-privatekey';
import AccountAddresses from './components/accountaddress';

const routes = [
  {
    path: '/',
    element: (
      <PublicRoute>
        <OnBoardingLayout>
          <Splash />
        </OnBoardingLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/add-wallet',
    element: (
      <OnBoardingLayout>
        <AddWallet />
      </OnBoardingLayout>
    ),
  },
  {
    path: '/recover-wallet',
    element: (
      <PublicRoute>
        <OnBoardingLayout>
          <RecoverWallet />
        </OnBoardingLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/recover-secret-phrase',
    element: (
      <PublicRoute>
        <OnBoardingLayout>
          <RecoverByPhrase />
        </OnBoardingLayout>
      </PublicRoute>
    ),
  },
  // {
  //   path: '/wallet-board',
  //   element: (
  //     <PrivateRoute>
  //       <Dashboard />
  //     </PrivateRoute>
  //   ),
  // },
  // {
  //   path: '/receive-sol',
  //   element: (
  //     <ReceiveSol />
  //   ),
  // },
  // {
  //   path: '/summary',
  //   element: (
  //     <Summary />
  //   ),
  // },
  {
    path: '/create-wallet',
    element: (
      <PublicRoute>
        <OnBoardingLayout>
          <CreateWallet />
        </OnBoardingLayout>
      </PublicRoute>
    ),
  },
  {
    path: '/receive',
    element: (
      <PrivateRoute>
        <Receive />
      </PrivateRoute>
    ),
  },
  {
    path: '/wallet-board',
    element: (
      <PrivateRoute>
        <WalletBoard />
      </PrivateRoute>
    ),
  },
  {
    path: '/send',
    element: (
      <PrivateRoute>
        <Send />
      </PrivateRoute>
    ),
  },
  {
    path: '/edit-account',
    element: (
      <PrivateRoute>
        <EditAccount />
      </PrivateRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <PrivateRoute>
        <Settings />
      </PrivateRoute>
    ),
  },
  {
    path: '/two-factor-verification',
    element: (
      <PrivateRoute>
        <TwoFactorAuthenticator />
      </PrivateRoute>
    ),
  },
  {
    path: '/recovery-phrase',
    element: (
      <PrivateRoute>
        <RecoveryPhrase />
      </PrivateRoute>
    ),
  },
  {
    path: '/secret-key',
    element: (
      <PrivateRoute>
        <PrivateKeyDisplay />
      </PrivateRoute>
    ),
  },
  {
    path: '/accounts',
    element: (
      <PrivateRoute>
        <AccountAddresses />
      </PrivateRoute>
    ),
  },
  {
    path: '/security-and-privacy',
    element: (
      <PrivateRoute>
        <SecurityAndPrivacy />
      </PrivateRoute>
    ),
  },
];

export default routes;
