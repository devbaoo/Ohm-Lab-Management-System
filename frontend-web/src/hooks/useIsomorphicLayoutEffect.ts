import { useLayoutEffect, useEffect } from "react";

// Sử dụng useLayoutEffect trên client, useEffect trên server để tránh hydration warnings
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
