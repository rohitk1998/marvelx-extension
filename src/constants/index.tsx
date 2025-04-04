import {
  keyIcon,
  lockIcon,
  solanaIcon,
  EditIconWhite,
  WhiteEyeIcon,
} from '../assets';

const ADD_WALLET_FEATURES = [
  {
    id: 1,
    img: keyIcon,
    heading: 'Your Keys, Your Crypto',
    description:
      'Create a new wallet or import an existing one—your assets, fully in your control.',
  },
  {
    id: 2,
    img: lockIcon,
    heading: 'Start Smart, Stay Secure',
    description:
      'Set up your wallet in seconds and experience AI-powered portfolio management.',
  },
  {
    id: 3,
    img: solanaIcon,
    heading: 'Seamless Access to the Solana Ecosystem',
    description:
      'Securely add or create a wallet and unlock powerful trading tools.',
  },
];

const RECOVER_WALLET_OPTIONS = [
  {
    id: 1,
    icon: EditIconWhite,
    title: 'Import Secret Recovery Key Phrase',
    description: 'Use a 12 word seed phrase',
    path: '/recover-secret-phrase',
  },
  {
    id: 2,
    icon: keyIcon,
    title: 'By Private Key',
    description: 'Restore with your private key',
    path: '/recover-private-key',
  },
  {
    id: 3,
    icon: WhiteEyeIcon,
    title: 'Watch Wallet',
    description: 'Observe or track assets of other SOL wallet',
    path: '3',
  },
];

const ROUTES = {
  ADD_WALLET: '/add-wallet',
  RECOVER_WALLET: '/recover-wallet',
  CREATE_WALLET: '/create-wallet',
  WALLET_ONBOARD: '/wallet-board',
  RECOVER_BY_PHRASE: '/recover-secret-phrase',
  EDIT_ACCOUNT: '/edit-account',
  SECURITYANDPRIVACY: '/security-and-privacy',
  WALLET_ACCOUNT: '/wallet-account',
};

// const BASE_URL = 'https://walletback-mnlv.onrender.com';

const BASE_URL='http://localhost:5000';

const API_URL = {
  createWallet: `${BASE_URL}/user/create-wallet`,
  getTokens: `${BASE_URL}/getTokens`,
  recoverWallet: `${BASE_URL}/user/recover-wallet`,
  profile: `${BASE_URL}/user/profile`,
  setPin: `${BASE_URL}/user/set-transaction-pin`,
  generate2FA: `${BASE_URL}/user/generate-2fa`,
  verify2FA: `${BASE_URL}/user/verify-2fa`,
  validate2FA: `${BASE_URL}/user/validate-2fa`,
  updateProfile: `${BASE_URL}/user/update-profile`,
  recoverbyPrivateKey: `${BASE_URL}/user/recover-by-privatekey`,
};

export { ADD_WALLET_FEATURES, RECOVER_WALLET_OPTIONS, ROUTES, API_URL };
