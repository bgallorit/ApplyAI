// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Return a cleanup function that will be called every time useEffect is re-called.
    // useEffect will only be re-called if value or delay changes.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-execute if value or delay changes

  return debouncedValue;
}

export default useDebounce;

