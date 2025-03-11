import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyASolXazefH4EWhMkqk5cwqlaUexJ8OIeU",
  authDomain: "login-app-8e247.firebaseapp.com",
  projectId: "login-app-8e247",
  storageBucket: "login-app-8e247.firebasestorage.app",
  messagingSenderId: "347207509406",
  appId: "1:347207509406:web:2f307a36a8bbc2bfd3628f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;