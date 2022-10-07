import { useState } from 'react';

export const useApiCall = <RES, REQ>(
  apiRequest: (request: REQ) => Promise<RES>
): [RES, boolean, (request: REQ) => void] => {
  const [requestIdObj] = useState({ requestId: 1 });
  const [isLoading, setIsLoading] = useState<boolean>(null);
  const [response, setResponse] = useState<RES>(null);

  const makeApiCall = (request: REQ) => {
    requestIdObj.requestId = requestIdObj.requestId + 1;
    const thisRequestId = requestIdObj.requestId;

    setResponse(null);
    setIsLoading(true);

    apiRequest(request)
      .then((response) => {
        if (thisRequestId === requestIdObj.requestId) {
          // Only set Response if it is the most recent one
          setResponse(response);
        }
      })
      .finally(async () => {
        if (thisRequestId === requestIdObj.requestId) {
          setIsLoading(false);
        }
      });
  };

  return [response, isLoading, makeApiCall];
};
