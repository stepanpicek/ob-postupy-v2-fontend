import { useState, useCallback } from 'react';
import useAlertWrapper from './use-alert';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlertWrapper();

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body && requestConfig.body instanceof FormData ? requestConfig.body :
          requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      setIsLoading(false);
      if (!response.ok) {
        if(response.status >= 500){
          alert.error("Nastal neočekávatelný problém.", true);
        }
        return response.status;
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
        case 'empty':
          return;
        default: data = await response.json();
      }
      applyData(data);

    } catch (err) {      
      setIsLoading(false);
      if(err.message && err.message.includes("Failed to fetch")){
        alert.error("Zkontrolujte své internetové připojení a zkuste to znovu.");
      }
      else{
        alert.error("Nastal neočekávatelný problém.", true);
      }
      return 500;
    }
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;