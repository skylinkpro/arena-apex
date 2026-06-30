// WebSocket handlers for Real-time updates and notifications

const setupWebSocketHandlers = (ws) => {
  console.log("Setting up WebSocket handlers for new connection");

  // Send welcome message
  ws.send(
    JSON.stringify({
      type: "connection",
      message: "Connected to WebSocket server",
      timestamp: new Date().toISOString(),
    })
  );

  // Handle incoming messages
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      handleWebSocketMessage(ws, data);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Invalid message format",
          timestamp: new Date().toISOString(),
        })
      );
    }
  });

  // Handle connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  // Start sending real-time updates
  startRealTimeUpdates(ws);
};

const handleWebSocketMessage = (ws, data) => {
  const { type, action, payload } = data;

  switch (type) {
    case "subscribe":
      handleSubscription(ws, action, payload);
      break;
    case "unsubscribe":
      handleUnsubscription(ws, action, payload);
      break;
    case "ping":
      ws.send(
        JSON.stringify({
          type: "pong",
          timestamp: new Date().toISOString(),
        })
      );
      break;
    default:
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Unknown message type",
          timestamp: new Date().toISOString(),
        })
      );
  }
};

const handleSubscription = (ws, action, payload) => {
  console.log(`Client subscribed to: ${action}`);

  switch (action) {
    case "market_data":
      // Send initial market data
      sendMarketDataUpdate(ws);
      break;
    case "game_updates":
      // Send initial game updates
      sendGameUpdate(ws);
      break;
    case "defi_pools":
      // Send initial DeFi pool updates
      sendDefiPoolUpdate(ws);
      break;
    case "nft_activity":
      // Send initial NFT activity
      sendNftActivityUpdate(ws);
      break;
    case "governance":
      // Send initial governance updates
      sendGovernanceUpdate(ws);
      break;
    case "notifications":
      // Send initial notifications
      sendNotificationUpdate(ws);
      break;
    default:
      ws.send(
        JSON.stringify({
          type: "error",
          message: `Unknown subscription type: ${action}`,
          timestamp: new Date().toISOString(),
        })
      );
  }
};

const handleUnsubscription = (ws, action, payload) => {
  console.log(`Client unsubscribed from: ${action}`);

  ws.send(
    JSON.stringify({
      type: "unsubscribed",
      action: action,
      message: `Successfully unsubscribed from ${action}`,
      timestamp: new Date().toISOString(),
    })
  );
};

const startRealTimeUpdates = (ws) => {
  // Market data updates every 5 seconds
  const marketDataInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      sendMarketDataUpdate(ws);
    } else {
      clearInterval(marketDataInterval);
    }
  }, 5000);

  // Game updates every 10 seconds
  const gameUpdateInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      sendGameUpdate(ws);
    } else {
      clearInterval(gameUpdateInterval);
    }
  }, 10000);

  // DeFi pool updates every 15 seconds
  const defiUpdateInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      sendDefiPoolUpdate(ws);
    } else {
      clearInterval(defiUpdateInterval);
    }
  }, 15000);

  // NFT activity updates every 20 seconds
  const nftUpdateInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      sendNftActivityUpdate(ws);
    } else {
      clearInterval(nftUpdateInterval);
    }
  }, 20000);

  // Governance updates every 30 seconds
  const governanceUpdateInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      sendGovernanceUpdate(ws);
    } else {
      clearInterval(governanceUpdateInterval);
    }
  }, 30000);

  // Notifications every 60 seconds
  const notificationInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      sendNotificationUpdate(ws);
    } else {
      clearInterval(notificationInterval);
    }
  }, 60000);
};

const sendMarketDataUpdate = (ws) => {
  const mockMarketData = {
    arnapex: {
      price: 2.45 + (Math.random() - 0.5) * 0.1,
      change24h: 5.2 + (Math.random() - 0.5) * 2,
      volume24h: 1250000 + Math.floor(Math.random() * 100000),
      marketCap: 24500000,
    },
    gaming: {
      price: 0.85 + (Math.random() - 0.5) * 0.05,
      change24h: -2.1 + (Math.random() - 0.5) * 1.5,
      volume24h: 450000 + Math.floor(Math.random() * 50000),
      marketCap: 8500000,
    },
    defi: {
      price: 1.2 + (Math.random() - 0.5) * 0.08,
      change24h: 8.7 + (Math.random() - 0.5) * 3,
      volume24h: 680000 + Math.floor(Math.random() * 80000),
      marketCap: 12000000,
    },
  };

  ws.send(
    JSON.stringify({
      type: "market_data_update",
      data: mockMarketData,
      timestamp: new Date().toISOString(),
    })
  );
};

const sendGameUpdate = (ws) => {
  const mockGameUpdate = {
    gameId: "game_001",
    title: "Crypto Warriors",
    players: 1250 + Math.floor(Math.random() * 50),
    rewards: {
      daily: 100 + Math.floor(Math.random() * 20),
      weekly: 500 + Math.floor(Math.random() * 100),
      monthly: 2000 + Math.floor(Math.random() * 500),
    },
    status: "Live",
    lastUpdate: new Date().toISOString(),
  };

  ws.send(
    JSON.stringify({
      type: "game_update",
      data: mockGameUpdate,
      timestamp: new Date().toISOString(),
    })
  );
};

const sendDefiPoolUpdate = (ws) => {
  const mockDefiUpdate = {
    poolId: "pool_001",
    name: "ARNAPEX-ETH",
    tvl: 2500000 + Math.floor(Math.random() * 100000),
    volume24h: 450000 + Math.floor(Math.random() * 50000),
    apy: 45.2 + (Math.random() - 0.5) * 5,
    lastUpdate: new Date().toISOString(),
  };

  ws.send(
    JSON.stringify({
      type: "defi_update",
      data: mockDefiUpdate,
      timestamp: new Date().toISOString(),
    })
  );
};

const sendNftActivityUpdate = (ws) => {
  const mockNftActivity = {
    collectionId: "collection_001",
    name: "Crypto Warriors",
    floorPrice: 150 + Math.floor(Math.random() * 20),
    volume24h: 45000 + Math.floor(Math.random() * 5000),
    sales: Math.floor(Math.random() * 10) + 1,
    lastUpdate: new Date().toISOString(),
  };

  ws.send(
    JSON.stringify({
      type: "nft_activity_update",
      data: mockNftActivity,
      timestamp: new Date().toISOString(),
    })
  );
};

const sendGovernanceUpdate = (ws) => {
  const mockGovernanceUpdate = {
    proposalId: "proposal_001",
    title: "Increase Gaming Rewards",
    votes: {
      for: 1250 + Math.floor(Math.random() * 50),
      against: 320 + Math.floor(Math.random() * 30),
      abstain: 150 + Math.floor(Math.random() * 20),
    },
    timeLeft: "2 days",
    lastUpdate: new Date().toISOString(),
  };

  ws.send(
    JSON.stringify({
      type: "governance_update",
      data: mockGovernanceUpdate,
      timestamp: new Date().toISOString(),
    })
  );
};

const sendNotificationUpdate = (ws) => {
  const mockNotifications = [
    {
      id: `notif_${Date.now()}`,
      type: "game_reward",
      title: "Game Reward Earned!",
      message: "You earned 150 ARNAPEX tokens from Crypto Warriors!",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: `notif_${Date.now() + 1}`,
      type: "defi_update",
      title: "High APY Alert",
      message: "ARNAPEX-ETH pool now offers 48.5% APY!",
      timestamp: new Date().toISOString(),
      read: false,
    },
  ];

  ws.send(
    JSON.stringify({
      type: "notification_update",
      data: mockNotifications,
      timestamp: new Date().toISOString(),
    })
  );
};

module.exports = {
  setupWebSocketHandlers,
};
