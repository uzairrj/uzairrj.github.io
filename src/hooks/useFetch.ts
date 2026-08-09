import { useState, useEffect } from 'react';

export function useFetch<T>(url: string, initial: T): T {
  const [data, setData] = useState<T>(initial);
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData);
  }, [url]);
  return data;
}
