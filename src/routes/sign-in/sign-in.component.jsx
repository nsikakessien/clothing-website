import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logInGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logInGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
