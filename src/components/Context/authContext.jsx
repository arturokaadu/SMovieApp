import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { useState } from "react";



export const authContext = createContext();
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const login = async (email, password) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredentials);
  };

  const logout = () => {
    signOut(auth);
  };

const resetPassword = (email)=> {
  sendPasswordResetEmail(auth,email)

 }
  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
      console.log(currentUser);
    });
    return () => unsubscribe()
  }, []);

  return (
    <authContext.Provider value={{ signUp, login, resetPassword, user, logout, loading }}>
      {children}
    </authContext.Provider>
  );
}; 
