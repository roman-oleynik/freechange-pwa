import { database } from '../firebase/firebaseConfig';
import { useState, useEffect } from 'react';

export function useOnline() {
  const [ isOnline, setIsOnline ] = useState<boolean>(false);
  
  useEffect(() => {
    const connectedRef = database.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    });
  }, [isOnline]);

  return { isOnline };
};