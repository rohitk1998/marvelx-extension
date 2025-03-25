import Splash from "./splash/splash";
import AddWallet from "./add-wallet/addwallet";
import { PrimaryButton } from "./common/primary-button";
import { SecondaryButton } from "./common/secondary-button";
import { NavigationBarTitle } from "./common/navigationbartitle";
import CreatePassword from "./create-wallet/createpassword";
import RecoverWallet from "./recover-wallet/recoverwallet"
import CreateWallet from "./create-wallet/createwallet";
import SecureWallet from "./create-wallet/securewallet";
import ConfirmPhrase from "./create-wallet/confirmphrase";
import WalletBoard from "./wallet/walletboard";
import RecoverByPhrase from "./recover-wallet/recoverbyphrase"
import SecretKey from "./secretKey/SecretKey"
import Dashboard from "./dashboard/index";
import ReceiveSol from "./receivesol/index"
import Summary from "./summary/index";
import Send from "./send/index";
import Spinner from "./common/spinner";
import EditAccount from "./editaccount/index";
import TwoFactorAuthenticator from "./2fa";
import TwoFaQrCode from "./2fa/auth2Fa";
import ValidatePin from "./send/validatepin";

export {
    Splash,
    AddWallet,
    PrimaryButton,
    SecondaryButton,
    CreatePassword,
    RecoverWallet,
    CreateWallet,
    SecureWallet,
    ConfirmPhrase,
    NavigationBarTitle,
    Dashboard,
    WalletBoard,
    ReceiveSol,
    Summary,
    RecoverByPhrase,
    SecretKey,
    Send,
    Spinner,
    EditAccount,
    TwoFactorAuthenticator,
    TwoFaQrCode,
    ValidatePin
}