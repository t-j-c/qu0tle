import { useState, useEffect, Dispatch } from "react";

function getStorageValue<T>(key: string, defaultValue: T): T {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : defaultValue;
    return initial || defaultValue;
  }
  return defaultValue
}

export interface LocalStorageProps<T> {
	value: T;
	setValue: Dispatch<T | ((prev: T) => T)>
}

export const useLocalStorage = <T>(key: string, defaultValue: T): LocalStorageProps<T> => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return {
		value: value,
		setValue: setValue
	}
};