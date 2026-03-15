import { useEffect, useMemo, useState } from "react";

type UseMediaQueryOptions = {
  defaultMatches?: boolean;
};

function normalizeMediaQuery(query: string) {
  return query
    .trim()
    .replace(/^@media\s*/i, "")
    .trim();
}

export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {},
) {
  const { defaultMatches = false } = options;
  const mediaQuery = useMemo(() => normalizeMediaQuery(query), [query]);

  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return defaultMatches;
    }

    return window.matchMedia(mediaQuery).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const queryList = window.matchMedia(mediaQuery);

    const update = () => {
      setMatches(queryList.matches);
    };

    update();

    if (typeof queryList.addEventListener === "function") {
      queryList.addEventListener("change", update);
      return () => queryList.removeEventListener("change", update);
    }

    queryList.addListener(update);
    return () => queryList.removeListener(update);
  }, [defaultMatches, mediaQuery]);

  return matches;
}
