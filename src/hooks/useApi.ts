// useApi.ts
import { useAuth0 } from "@auth0/auth0-react";
import { callApi } from "../api/apiService";

interface CallApiFunction {
  (endpoint: string, method?: string, body?: unknown): Promise<unknown>;
}

function useApi(): { callApiWithToken: CallApiFunction } {
  const { getAccessTokenSilently } = useAuth0();

  const callApiWithToken: CallApiFunction = async (endpoint, method = "GET", body = null) => {
    const token = await getAccessTokenSilently();
    return callApi(token, endpoint, method, body);
  };

  return { callApiWithToken };  // Changed 'callApi' to 'callApiWithToken' here
}

export default useApi;
