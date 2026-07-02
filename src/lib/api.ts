/**
 * API Configuration and Axios Instance
 * Handles all HTTP requests to the backend
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Get API base URL from environment or use default
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Gaming
  gaming: {
    getGames: () => api.get("/gaming/games"),
    getGame: (id: string) => api.get(`/gaming/games/${id}`),
    getLeaderboard: () => api.get("/gaming/leaderboard"),
    getUserStats: (userId: string) => api.get(`/gaming/user/${userId}/stats`),
    startGame: (gameId: string) => api.post(`/gaming/games/${gameId}/start`),
    endGame: (gameId: string) => api.post(`/gaming/games/${gameId}/end`),
    getTournaments: () => api.get("/gaming/tournaments"),
    joinTournament: (tournamentId: string) =>
      api.post(`/gaming/tournaments/${tournamentId}/join`),
  },

  // DeFi
  defi: {
    getPools: () => api.get("/defi/pools"),
    getPool: (id: string) => api.get(`/defi/pools/${id}`),
    getOverview: () => api.get("/defi/overview"),
    getLeaderboard: () => api.get("/defi/leaderboard"),
    addLiquidity: (poolId: string, data: any) =>
      api.post(`/defi/pools/${poolId}/add-liquidity`, data),
    removeLiquidity: (poolId: string, data: any) =>
      api.post(`/defi/pools/${poolId}/remove-liquidity`, data),
    swap: (data: any) => api.post("/defi/swap", data),
    getYieldFarming: () => api.get("/defi/yield-farming"),
    stakeYieldFarming: (id: string, data: any) =>
      api.post(`/defi/yield-farming/${id}/stake`, data),
    getUserPortfolio: (userId: string) =>
      api.get(`/defi/user/${userId}/portfolio`),
  },

  // NFT
  nft: {
    getCollections: () => api.get("/nft/collections"),
    getCollection: (id: string) => api.get(`/nft/collections/${id}`),
    getCollectionNFTs: (id: string) => api.get(`/nft/collections/${id}/nfts`),
    getNFTs: (params?: any) => api.get("/nft/nfts", { params }),
    getNFT: (id: string) => api.get(`/nft/nfts/${id}`),
    listNFT: (id: string, data: any) => api.post(`/nft/nfts/${id}/list`, data),
    buyNFT: (id: string, data: any) => api.post(`/nft/nfts/${id}/buy`, data),
    getStats: () => api.get("/nft/stats"),
    getLeaderboard: () => api.get("/nft/leaderboard"),
    createCollection: (data: any) => api.post("/nft/collections", data),
    mintNFT: (data: any) => api.post("/nft/mint", data),
  },

  // Launchpad
  launchpad: {
    getProjects: () => api.get("/launchpad/projects"),
    getProject: (id: string) => api.get(`/launchpad/projects/${id}`),
    participateIDO: (projectId: string, data: any) =>
      api.post(`/launchpad/projects/${projectId}/participate`, data),
    submitProject: (data: any) => api.post("/launchpad/submit-project", data),
    getStats: () => api.get("/launchpad/stats"),
    getUserParticipation: (userId: string) =>
      api.get(`/launchpad/user/${userId}/participation`),
    getUpcoming: () => api.get("/launchpad/upcoming"),
    getLive: () => api.get("/launchpad/live"),
  },

  // Governance
  governance: {
    getProposals: () => api.get("/governance/proposals"),
    getProposal: (id: string) => api.get(`/governance/proposals/${id}`),
    createProposal: (data: any) => api.post("/governance/proposals", data),
    voteProposal: (proposalId: string, data: any) =>
      api.post(`/governance/proposals/${proposalId}/vote`, data),
    getStats: () => api.get("/governance/stats"),
    getUserVotingHistory: (userId: string) =>
      api.get(`/governance/user/${userId}/voting-history`),
    getActive: () => api.get("/governance/active"),
    getPending: () => api.get("/governance/pending"),
    getDiscussion: (proposalId: string) =>
      api.get(`/governance/proposals/${proposalId}/discussion`),
  },

  // User
  user: {
    getUsers: () => api.get("/user"),
    getUser: (id: string) => api.get(`/user/${id}`),
    getUserProfile: (id: string) => api.get(`/user/${id}/profile`),
    updateUserProfile: (id: string, data: any) =>
      api.put(`/user/${id}/profile`, data),
    getUserTransactions: (id: string) => api.get(`/user/${id}/transactions`),
    getUserPortfolio: (id: string) => api.get(`/user/${id}/portfolio`),
    getUserAchievements: (id: string) => api.get(`/user/${id}/achievements`),
    getUserConnections: (id: string) => api.get(`/user/${id}/connections`),
    followUser: (id: string) => api.post(`/user/${id}/follow`),
    unfollowUser: (id: string) => api.delete(`/user/${id}/follow`),
  },

  // Analytics
  analytics: {
    getOverview: () => api.get("/analytics/overview"),
    getGamingAnalytics: () => api.get("/analytics/gaming"),
    getDefiAnalytics: () => api.get("/analytics/defi"),
    getNFTAnalytics: () => api.get("/analytics/nft"),
    getGovernanceAnalytics: () => api.get("/analytics/governance"),
    getMarketData: () => api.get("/analytics/market-data"),
  },

  // Health check
  health: () => axios.get(`${API_BASE_URL}/health`),
};

export default api;
