/**
 * Example Component - API Usage
 *
 * This component demonstrates how to use the API client and hooks
 * to communicate with the backend. Use this as a reference when
 * building your own components.
 */

import { useEffect } from "react";
import {
  useGamingApi,
  useDefiApi,
  useNftApi,
  useAnalyticsApi,
} from "@/hooks/use-api";
import { wsManager } from "@/lib/websocket";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ExampleApiUsage() {
  const { toast } = useToast();
  const gamingApi = useGamingApi();
  const defiApi = useDefiApi();
  const nftApi = useNftApi();
  const analyticsApi = useAnalyticsApi();

  // Initialize WebSocket connection on mount
  useEffect(() => {
    const initWebSocket = async () => {
      try {
        await wsManager.connect();
        console.log("✅ WebSocket connected");

        // Subscribe to real-time updates
        wsManager.subscribe("market_data", (data) => {
          console.log("📊 Market data update:", data);
        });

        wsManager.subscribe("game_updates", (data) => {
          console.log("🎮 Game update:", data);
        });
      } catch (error) {
        console.error("❌ WebSocket connection failed:", error);
      }
    };

    initWebSocket();

    return () => {
      wsManager.disconnect();
    };
  }, []);

  // Gaming Examples
  const handleGetGames = async () => {
    try {
      const response = await gamingApi.getGames();
      toast({
        title: "Success",
        description: `Loaded ${response?.length || 0} games`,
      });
      console.log("🎮 Games:", response);
    } catch (error) {
      console.error("Error loading games:", error);
    }
  };

  const handleGetLeaderboard = async () => {
    try {
      const response = await gamingApi.getLeaderboard();
      toast({
        title: "Success",
        description: "Leaderboard loaded",
      });
      console.log("🏆 Leaderboard:", response);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    }
  };

  // DeFi Examples
  const handleGetPools = async () => {
    try {
      const response = await defiApi.getPools();
      toast({
        title: "Success",
        description: `Loaded ${response?.length || 0} pools`,
      });
      console.log("💰 DeFi Pools:", response);
    } catch (error) {
      console.error("Error loading pools:", error);
    }
  };

  // NFT Examples
  const handleGetCollections = async () => {
    try {
      const response = await nftApi.getCollections();
      toast({
        title: "Success",
        description: `Loaded ${response?.length || 0} collections`,
      });
      console.log("🖼️ NFT Collections:", response);
    } catch (error) {
      console.error("Error loading collections:", error);
    }
  };

  // Analytics Example
  const handleGetAnalytics = async () => {
    try {
      const response = await analyticsApi.getOverview();
      toast({
        title: "Success",
        description: "Analytics overview loaded",
      });
      console.log("📈 Analytics:", response);
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">API Integration Examples</h2>
        <p className="text-gray-600 mb-6">
          Click the buttons below to test API endpoints and WebSocket
          connections. Check the browser console and toast notifications for
          results.
        </p>
      </div>

      {/* Loading and Error States */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Current State:</h3>
        <p>
          Gaming API:{" "}
          {gamingApi.loading
            ? "⏳ Loading"
            : gamingApi.error
            ? "❌ Error"
            : "✅ Ready"}
        </p>
        <p>
          DeFi API:{" "}
          {defiApi.loading
            ? "⏳ Loading"
            : defiApi.error
            ? "❌ Error"
            : "✅ Ready"}
        </p>
        <p>
          NFT API:{" "}
          {nftApi.loading
            ? "⏳ Loading"
            : nftApi.error
            ? "❌ Error"
            : "✅ Ready"}
        </p>
        <p>
          Analytics API:{" "}
          {analyticsApi.loading
            ? "⏳ Loading"
            : analyticsApi.error
            ? "❌ Error"
            : "✅ Ready"}
        </p>
        <p>
          WebSocket:{" "}
          {wsManager.isConnected() ? "🔗 Connected" : "🔌 Disconnected"}
        </p>
      </div>

      {/* Gaming API */}
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          🎮 Gaming API
          {gamingApi.loading && <span className="text-sm">Loading...</span>}
        </h3>
        <div className="space-y-2">
          <Button
            onClick={handleGetGames}
            disabled={gamingApi.loading}
            variant="outline"
          >
            Get Games
          </Button>
          <Button
            onClick={handleGetLeaderboard}
            disabled={gamingApi.loading}
            variant="outline"
          >
            Get Leaderboard
          </Button>
        </div>
        {gamingApi.error && (
          <p className="text-red-500 text-sm mt-2">{gamingApi.error}</p>
        )}
        {gamingApi.data && (
          <p className="text-green-500 text-sm mt-2">✅ Data loaded</p>
        )}
      </div>

      {/* DeFi API */}
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          💰 DeFi API
          {defiApi.loading && <span className="text-sm">Loading...</span>}
        </h3>
        <div className="space-y-2">
          <Button
            onClick={handleGetPools}
            disabled={defiApi.loading}
            variant="outline"
          >
            Get Pools
          </Button>
          <Button
            onClick={() => defiApi.getOverview()}
            disabled={defiApi.loading}
            variant="outline"
          >
            Get Overview
          </Button>
        </div>
        {defiApi.error && (
          <p className="text-red-500 text-sm mt-2">{defiApi.error}</p>
        )}
        {defiApi.data && (
          <p className="text-green-500 text-sm mt-2">✅ Data loaded</p>
        )}
      </div>

      {/* NFT API */}
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          🖼️ NFT API
          {nftApi.loading && <span className="text-sm">Loading...</span>}
        </h3>
        <div className="space-y-2">
          <Button
            onClick={handleGetCollections}
            disabled={nftApi.loading}
            variant="outline"
          >
            Get Collections
          </Button>
          <Button
            onClick={() => nftApi.getStats()}
            disabled={nftApi.loading}
            variant="outline"
          >
            Get Stats
          </Button>
        </div>
        {nftApi.error && (
          <p className="text-red-500 text-sm mt-2">{nftApi.error}</p>
        )}
        {nftApi.data && (
          <p className="text-green-500 text-sm mt-2">✅ Data loaded</p>
        )}
      </div>

      {/* Analytics API */}
      <div className="border rounded-lg p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          📈 Analytics API
          {analyticsApi.loading && <span className="text-sm">Loading...</span>}
        </h3>
        <div className="space-y-2">
          <Button
            onClick={handleGetAnalytics}
            disabled={analyticsApi.loading}
            variant="outline"
          >
            Get Overview
          </Button>
          <Button
            onClick={() => analyticsApi.getGamingAnalytics()}
            disabled={analyticsApi.loading}
            variant="outline"
          >
            Get Gaming Analytics
          </Button>
        </div>
        {analyticsApi.error && (
          <p className="text-red-500 text-sm mt-2">{analyticsApi.error}</p>
        )}
        {analyticsApi.data && (
          <p className="text-green-500 text-sm mt-2">✅ Data loaded</p>
        )}
      </div>

      {/* Usage Notes */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📝 How to Use:</h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>Each API hook manages loading, error, and data states</li>
          <li>Errors automatically show in toast notifications</li>
          <li>Open browser console (F12) to see detailed logs</li>
          <li>WebSocket messages appear in console</li>
        </ul>
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
        <h3 className="font-semibold mb-2">💻 Usage Example:</h3>
        <pre>{`import { useGamingApi } from '@/hooks/use-api';

function MyComponent() {
  const api = useGamingApi();

  const handleClick = async () => {
    await api.getGames();
  };

  return (
    <>
      {api.loading && <p>Loading...</p>}
      {api.error && <p>Error: {api.error}</p>}
      {api.data && <p>Games: {api.data.length}</p>}
      <button onClick={handleClick}>Load Games</button>
    </>
  );
}`}</pre>
      </div>
    </div>
  );
}

export default ExampleApiUsage;
