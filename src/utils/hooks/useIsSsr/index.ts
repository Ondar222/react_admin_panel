import { useEffect, useState } from "react";

const useIsSsr = (): boolean => {
  const [isSsr, setIsSsr] = useState<boolean>(true);

  useEffect(() => {
    setIsSsr(false);
  }, []);

  return isSsr;
};

export default useIsSsr;
