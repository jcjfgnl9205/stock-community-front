import { useEffect, useState } from "react";


const useFetch = url => {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        
        setData(response.items ?? response);
        setLoading(false);
      })
      .catch(error => setError(error))
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
