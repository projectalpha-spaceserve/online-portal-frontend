import { useMemo, useState } from "react";

/**
 * @param {Array} data - array of objects to search
 * @param {Array<string>} keys - object keys to search against
 */
export function useSearch(data = [], keys = []) {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!query) return data;

    const lowerQuery = query.toLowerCase();

    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerQuery);
      }),
    );
  }, [data, keys, query]);

  return {
    query,
    setQuery,
    filteredData,
  };
}
