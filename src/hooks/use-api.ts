/**
 * useApi Hook
 * Simplifies API calls with loading and error states
 */

import { useState, useCallback } from "react";
import { apiEndpoints } from "@/lib/api";
import { useToast } from "./use-toast";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T = any>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const { toast } = useToast();

  const request = useCallback(
    async (
      apiCall: () => Promise<T>,
      options?: { showError?: boolean; showSuccess?: boolean }
    ) => {
      const { showError = true, showSuccess = false } = options || {};

      setState({ data: null, loading: true, error: null });
      try {
        const response = await apiCall();
        setState({ data: response, loading: false, error: null });

        if (showSuccess) {
          toast({
            title: "Success",
            description: "Operation completed successfully",
          });
        }

        return response;
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || err?.message || "An error occurred";
        setState({ data: null, loading: false, error: errorMessage });

        if (showError) {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }

        throw err;
      }
    },
    [toast]
  );

  return {
    ...state,
    request,
  };
}

/**
 * Specific hooks for each module
 */

export function useGamingApi() {
  const api = useApi();

  return {
    ...api,
    getGames: () => api.request(() => apiEndpoints.gaming.getGames() as any),
    getGame: (id: string) =>
      api.request(() => apiEndpoints.gaming.getGame(id) as any),
    getLeaderboard: () =>
      api.request(() => apiEndpoints.gaming.getLeaderboard() as any),
    getUserStats: (userId: string) =>
      api.request(() => apiEndpoints.gaming.getUserStats(userId) as any),
    startGame: (gameId: string) =>
      api.request(() => apiEndpoints.gaming.startGame(gameId) as any),
    endGame: (gameId: string) =>
      api.request(() => apiEndpoints.gaming.endGame(gameId) as any),
    getTournaments: () =>
      api.request(() => apiEndpoints.gaming.getTournaments() as any),
    joinTournament: (tournamentId: string) =>
      api.request(
        () => apiEndpoints.gaming.joinTournament(tournamentId) as any
      ),
  };
}

export function useDefiApi() {
  const api = useApi();

  return {
    ...api,
    getPools: () => api.request(() => apiEndpoints.defi.getPools() as any),
    getPool: (id: string) =>
      api.request(() => apiEndpoints.defi.getPool(id) as any),
    getOverview: () =>
      api.request(() => apiEndpoints.defi.getOverview() as any),
    getLeaderboard: () =>
      api.request(() => apiEndpoints.defi.getLeaderboard() as any),
    getUserPortfolio: (userId: string) =>
      api.request(() => apiEndpoints.defi.getUserPortfolio(userId) as any),
  };
}

export function useNftApi() {
  const api = useApi();

  return {
    ...api,
    getCollections: () =>
      api.request(() => apiEndpoints.nft.getCollections() as any),
    getCollection: (id: string) =>
      api.request(() => apiEndpoints.nft.getCollection(id) as any),
    getNFTs: (params?: any) =>
      api.request(() => apiEndpoints.nft.getNFTs(params) as any),
    getNFT: (id: string) =>
      api.request(() => apiEndpoints.nft.getNFT(id) as any),
    getStats: () => api.request(() => apiEndpoints.nft.getStats() as any),
    getLeaderboard: () =>
      api.request(() => apiEndpoints.nft.getLeaderboard() as any),
  };
}

export function useUserApi() {
  const api = useApi();

  return {
    ...api,
    getUsers: () => api.request(() => apiEndpoints.user.getUsers() as any),
    getUser: (id: string) =>
      api.request(() => apiEndpoints.user.getUser(id) as any),
    getUserProfile: (id: string) =>
      api.request(() => apiEndpoints.user.getUserProfile(id) as any),
    updateUserProfile: (id: string, data: any) =>
      api.request(() => apiEndpoints.user.updateUserProfile(id, data) as any),
    getUserTransactions: (id: string) =>
      api.request(() => apiEndpoints.user.getUserTransactions(id) as any),
    getUserPortfolio: (id: string) =>
      api.request(() => apiEndpoints.user.getUserPortfolio(id) as any),
  };
}

export function useAnalyticsApi() {
  const api = useApi();

  return {
    ...api,
    getOverview: () =>
      api.request(() => apiEndpoints.analytics.getOverview() as any),
    getGamingAnalytics: () =>
      api.request(() => apiEndpoints.analytics.getGamingAnalytics() as any),
    getDefiAnalytics: () =>
      api.request(() => apiEndpoints.analytics.getDefiAnalytics() as any),
    getNFTAnalytics: () =>
      api.request(() => apiEndpoints.analytics.getNFTAnalytics() as any),
  };
}
