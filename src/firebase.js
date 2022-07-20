import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import Swal from 'sweetalert2'

const firebaseConfig = {
    apiKey: "AIzaSyAi0BRlW4HPqp_Ey_nmTk6Jjmd1d0v4uBY",
    authDomain: "investreet-c44d4.firebaseapp.com",
    projectId: "investreet-c44d4",
    storageBucket: "investreet-c44d4.appspot.com",
    messagingSenderId: "245983796941",
    appId: "1:245983796941:web:fcefc4c5b76a28f8209384",
    measurementId: "G-Z1L7E6D1NM"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: err.message
      })
    }
  };
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Logged in successfully'
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: err.message
      })
    }
  };
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      Swal.fire({
        icon: 'success',
        title: 'Registered successfully'
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: err.message
      })
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'info',
        title: 'Password reset link sent!'
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: err.message
      })
    }
  };
  const logout = () => {
    signOut(auth);
  };
  const resetPassword = async (currPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Swal.fire({
        icon: 'success',
        title: "Password reset successfully"
      })
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: err.message
      })
    }
  };
  export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    resetPassword
  };
  