import { useState, useCallback } from "react";

function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, text, point = 0) => {
    setToast({ type, text, point });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return { toast, showToast };
}

export default useToast;
