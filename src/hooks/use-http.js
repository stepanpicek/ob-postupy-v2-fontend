import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      let data;
      switch (requestConfig.responseType) {
        case 'blob':
          data = await response.blob();
          break;
        case 'text':
          data = await response.text();
          break;
        case 'json':
          data = await response.json();
          break;
        default: data = await response.json();
      }
      applyData(data);

    } catch (err) {
      throw new Error('Request failed!');
    }
    finally{
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;