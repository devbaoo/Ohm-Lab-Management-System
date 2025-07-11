import { useEffect, useState } from "react";

// Hook để đảm bảo component chỉ render sau khi hydration hoàn thành
export const useClientOnly = () => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};
