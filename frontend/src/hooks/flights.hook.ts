import { useMutation, useQuery } from "react-query";

import { BackendClient } from "../clients/backend.client";

const backendClient = new BackendClient();

export interface MutationError {
  response: {
    data: {
      message: string;
    };
  };
}

export function useFlights() {
  const query = useQuery(["flights"], () => backendClient.getFlights());

  return query?.data?.data;
}

export function useUpdateFlightStatus() {
  const mutation = useMutation((bodyRequest: object) => {
    return backendClient.updateFlight(bodyRequest);
  });
  return mutation;
}
