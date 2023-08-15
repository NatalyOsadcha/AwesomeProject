// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import { enableLogging } from "firebase/database";

enableLogging(true);

const firebaseConfig = {
  apiKey: "AIzaSyAZfeGNyUMo3fUOn6uvT0XdMy7xp06BGUw",
  authDomain: "awesomeproject-19109.firebaseapp.com",
  projectId: "awesomeproject-19109",
  storageBucket: "awesomeproject-19109.appspot.com",
  messagingSenderId: "73662064364",
  appId: "1:73662064364:web:555f92cd7922b5bbd2a7c9",
  measurementId: "G-YZL9N13M6J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
