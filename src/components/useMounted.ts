"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * SSR-safe "has the client hydrated?" flag. False during prerender/hydration,
 * true on the client — the rule-compliant replacement for the
 * `useState(false) + useEffect(() => setMounted(true), [])` idiom.
 */
export default function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
