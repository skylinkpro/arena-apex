// In-memory data storage
let mockData = {
  users: [],
  games: [],
  defiPools: [],
  nftCollections: [],
  nfts: [],
  launchpadProjects: [],
  governanceProposals: [],
  marketData: {},
  leaderboards: {},
  transactions: [],
};

const initializeMockData = () => {
  // Users
  mockData.users = [
    {
      id: "user_001",
      username: "CryptoGamer",
      email: "gamer@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoGamer",
      level: 42,
      experience: 125000,
      balance: 50000,
      joinDate: "2023-06-15",
      achievements: ["First Game", "DeFi Pioneer", "NFT Collector"],
      stats: {
        gamesPlayed: 156,
        totalRewards: 25000,
        nftsOwned: 23,
        tournamentsWon: 8,
      },
    },
    {
      id: "user_002",
      username: "DeFiTrader",
      email: "trader@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DeFiTrader",
      level: 38,
      experience: 98000,
      balance: 75000,
      joinDate: "2023-08-22",
      achievements: ["Liquidity Provider", "Yield Farmer", "Risk Manager"],
      stats: {
        gamesPlayed: 89,
        totalRewards: 18000,
        nftsOwned: 15,
        tournamentsWon: 5,
      },
    },
    {
      id: "user_003",
      username: "NFTArtist",
      email: "artist@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NFTArtist",
      level: 35,
      experience: 85000,
      balance: 30000,
      joinDate: "2023-09-10",
      achievements: ["Creator", "Curator", "Community Builder"],
      stats: {
        gamesPlayed: 67,
        totalRewards: 12000,
        nftsOwned: 45,
        tournamentsWon: 3,
      },
    },
  ];

  // Games
  mockData.games = [
    {
      id: "game_001",
      title: "Crypto Warriors",
      genre: "RPG",
      description:
        "Epic blockchain RPG where you battle, collect, and trade NFT warriors",
      image: "/images/games/crypto-warriors.jpg",
      status: "Live",
      players: 1250,
      maxPlayers: 10000,
      rewards: {
        daily: 100,
        weekly: 500,
        monthly: 2000,
      },
      requirements: {
        minLevel: 5,
        minBalance: 100,
      },
      features: ["NFT Characters", "PvP Battles", "Guild System", "Trading"],
    },
    {
      id: "game_002",
      title: "Yield Quest",
      genre: "Strategy",
      description:
        "Strategic DeFi game where you build and manage yield farming operations",
      image: "/images/games/yield-quest.jpg",
      status: "Live",
      players: 890,
      maxPlayers: 5000,
      rewards: {
        daily: 150,
        weekly: 750,
        monthly: 3000,
      },
      requirements: {
        minLevel: 10,
        minBalance: 500,
      },
      features: [
        "Yield Farming",
        "Portfolio Management",
        "Risk Assessment",
        "Competitions",
      ],
    },
    {
      id: "game_003",
      title: "NFT Racing",
      genre: "Racing",
      description:
        "High-speed racing game with customizable NFT vehicles and tracks",
      image: "/images/games/nft-racing.jpg",
      status: "Beta",
      players: 450,
      maxPlayers: 2000,
      rewards: {
        daily: 75,
        weekly: 400,
        monthly: 1500,
      },
      requirements: {
        minLevel: 3,
        minBalance: 50,
      },
      features: [
        "Custom Cars",
        "Track Editor",
        "Multiplayer Races",
        "Car Trading",
      ],
    },
  ];

  // DeFi Pools
  mockData.defiPools = [
    {
      id: "pool_001",
      name: "ARNAPEZ-ETH",
      pair: "ARNAPEZ/ETH",
      token0: "ARNAPEZ",
      token1: "ETH",
      tvl: 2500000,
      volume24h: 450000,
      apy: 45.2,
      fees: 0.3,
      liquidity: 1250000,
      status: "active",
    },
    {
      id: "pool_002",
      name: "ARNAPEZ-USDC",
      pair: "ARNAPEZ/USDC",
      token0: "ARNAPEZ",
      token1: "USDC",
      tvl: 1800000,
      volume24h: 320000,
      apy: 38.7,
      fees: 0.3,
      liquidity: 900000,
      status: "active",
    },
    {
      id: "pool_003",
      name: "GAMING-ARNAPEZ",
      pair: "GAMING/ARNAPEZ",
      token0: "GAMING",
      token1: "ARNAPEZ",
      tvl: 950000,
      volume24h: 180000,
      apy: 52.1,
      fees: 0.3,
      liquidity: 475000,
      status: "active",
    },
  ];

  // NFT Collections
  mockData.nftCollections = [
    {
      id: "collection_001",
      name: "Crypto Warriors",
      description: "Epic NFT warriors for the Crypto Warriors game",
      image: "/images/collections/crypto-warriors.jpg",
      banner: "/images/collections/crypto-warriors-banner.jpg",
      creator: "user_001",
      floorPrice: 150,
      totalSupply: 10000,
      items: 8500,
      owners: 4200,
      volume24h: 45000,
      volumeTotal: 1250000,
      status: "active",
    },
    {
      id: "collection_002",
      name: "DeFi Legends",
      description: "Legendary DeFi characters and items",
      image: "/images/collections/defi-legends.jpg",
      banner: "/images/collections/defi-legends-banner.jpg",
      creator: "user_002",
      floorPrice: 200,
      totalSupply: 5000,
      items: 3200,
      owners: 1800,
      volume24h: 28000,
      volumeTotal: 850000,
      status: "active",
    },
  ];

  // NFTs
  mockData.nfts = [
    {
      id: "nft_001",
      name: "Warrior #001",
      description: "Epic warrior with legendary stats",
      image: "/images/nfts/warrior-001.jpg",
      collectionId: "collection_001",
      owner: "user_001",
      price: 200,
      status: "listed",
      attributes: {
        rarity: "Legendary",
        attack: 95,
        defense: 88,
        speed: 92,
      },
      metadata: {
        tokenId: "1",
        contractAddress: "0x1234...",
        blockchain: "Ethereum",
      },
    },
    {
      id: "nft_002",
      name: "DeFi Master #001",
      description: "Master of DeFi strategies",
      image: "/images/nfts/defi-master-001.jpg",
      collectionId: "collection_002",
      owner: "user_002",
      price: 350,
      status: "owned",
      attributes: {
        rarity: "Epic",
        yield: 95,
        risk: 15,
        experience: 88,
      },
      metadata: {
        tokenId: "1",
        contractAddress: "0x5678...",
        blockchain: "Polygon",
      },
    },
  ];

  // Launchpad Projects
  mockData.launchpadProjects = [
    {
      id: "project_001",
      name: "MetaVerse Gaming",
      description: "Next-generation metaverse gaming platform",
      image: "/images/projects/metaverse-gaming.jpg",
      category: "Gaming",
      status: "live",
      progress: 75,
      target: 1000000,
      raised: 750000,
      participants: 1250,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      tokenPrice: 0.05,
      minInvestment: 100,
      maxInvestment: 10000,
    },
    {
      id: "project_002",
      name: "DeFi Protocol X",
      description: "Advanced DeFi protocol with innovative yield strategies",
      image: "/images/projects/defi-protocol-x.jpg",
      category: "DeFi",
      status: "upcoming",
      progress: 0,
      target: 2000000,
      raised: 0,
      participants: 0,
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      tokenPrice: 0.1,
      minInvestment: 200,
      maxInvestment: 20000,
    },
  ];

  // Governance Proposals
  mockData.governanceProposals = [
    {
      id: "proposal_001",
      title: "Increase Gaming Rewards",
      description: "Proposal to increase daily gaming rewards by 20%",
      category: "Gaming",
      status: "active",
      creator: "user_001",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      votes: {
        for: 1250,
        against: 320,
        abstain: 150,
      },
      quorum: 1000,
      threshold: 60,
      executed: false,
    },
    {
      id: "proposal_002",
      title: "Add New DeFi Pool",
      description: "Proposal to add Arn-Apex-BTC liquidity pool",
      category: "DeFi",
      status: "pending",
      creator: "user_002",
      startDate: "2024-02-01",
      endDate: "2024-02-11",
      votes: {
        for: 0,
        against: 0,
        abstain: 0,
      },
      quorum: 1000,
      threshold: 60,
      executed: false,
    },
  ];

  // Market Data
  mockData.marketData = {
    arnapex: {
      price: 2.45,
      change24h: 5.2,
      volume24h: 1250000,
      marketCap: 24500000,
    },
    gaming: {
      price: 0.85,
      change24h: -2.1,
      volume24h: 450000,
      marketCap: 8500000,
    },
    defi: {
      price: 1.2,
      change24h: 8.7,
      volume24h: 680000,
      marketCap: 12000000,
    },
  };

  // Leaderboards
  mockData.leaderboards = {
    gaming: [
      { userId: "user_001", username: "CryptoGamer", score: 125000, rank: 1 },
      { userId: "user_002", username: "DeFiTrader", score: 98000, rank: 2 },
      { userId: "user_003", username: "NFTArtist", score: 85000, rank: 3 },
    ],
    defi: [
      { userId: "user_002", username: "DeFiTrader", score: 180000, rank: 1 },
      { userId: "user_001", username: "CryptoGamer", score: 125000, rank: 2 },
      { userId: "user_003", username: "NFTArtist", score: 95000, rank: 3 },
    ],
    nft: [
      { userId: "user_003", username: "NFTArtist", score: 45000, rank: 1 },
      { userId: "user_001", username: "CryptoGamer", score: 23000, rank: 2 },
      { userId: "user_002", username: "DeFiTrader", score: 15000, rank: 3 },
    ],
  };

  // Transactions
  mockData.transactions = [
    {
      id: "tx_001",
      type: "game_reward",
      userId: "user_001",
      gameId: "game_001",
      amount: 250,
      status: "completed",
      timestamp: "2024-01-15T10:30:00Z",
      metadata: {
        gameTitle: "Crypto Warriors",
        score: 8500,
      },
    },
    {
      id: "tx_002",
      type: "liquidity_add",
      userId: "user_002",
      poolId: "pool_001",
      amount: 1000,
      status: "completed",
      timestamp: "2024-01-15T11:15:00Z",
      metadata: {
        poolName: "ARNAPEZ-ETH",
        tokens: { arnapex: 500, eth: 0.5 },
      },
    },
  ];
};

// Data retrieval functions
const getUsers = () => mockData.users;
const getGames = () => mockData.games;
const getDefiPools = () => mockData.defiPools;
const getNftCollections = () => mockData.nftCollections;
const getNfts = () => mockData.nfts;
const getLaunchpadProjects = () => mockData.launchpadProjects;
const getGovernanceProposals = () => mockData.governanceProposals;
const getMarketData = () => mockData.marketData;
const getLeaderboards = () => mockData.leaderboards;
const getTransactions = () => mockData.transactions;

// Specific data retrieval functions
const getUserById = (id) => mockData.users.find((user) => user.id === id);
const getGameById = (id) => mockData.games.find((game) => game.id === id);
const getDefiPoolById = (id) =>
  mockData.defiPools.find((pool) => pool.id === id);
const getNftCollectionById = (id) =>
  mockData.nftCollections.find((collection) => collection.id === id);
const getNftById = (id) => mockData.nfts.find((nft) => nft.id === id);
const getLaunchpadProjectById = (id) =>
  mockData.launchpadProjects.find((project) => project.id === id);
const getGovernanceProposalById = (id) =>
  mockData.governanceProposals.find((proposal) => proposal.id === id);

// Gaming specific functions
const getGamingLeaderboard = () => mockData.leaderboards.gaming;
const getUserGamingStats = (userId) => {
  const user = getUserById(userId);
  if (!user) return null;

  return {
    userId: user.id,
    username: user.username,
    level: user.level,
    experience: user.experience,
    totalGamesPlayed: user.stats.gamesPlayed,
    totalRewards: user.stats.totalRewards,
    tournamentsWon: user.stats.tournamentsWon,
    achievements: user.achievements,
  };
};

// Data update functions
const updateUser = (id, updates) => {
  const userIndex = mockData.users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    mockData.users[userIndex] = { ...mockData.users[userIndex], ...updates };
    return mockData.users[userIndex];
  }
  return null;
};

const addTransaction = (transaction) => {
  const newTransaction = {
    id: transaction.id || `tx_${Date.now()}`,
    ...transaction,
    timestamp: transaction.timestamp || new Date().toISOString(),
  };
  mockData.transactions.unshift(newTransaction);
  return newTransaction;
};

// Export functions
module.exports = {
  initializeMockData,
  getUsers,
  getGames,
  getDefiPools,
  getNftCollections,
  getNfts,
  getLaunchpadProjects,
  getGovernanceProposals,
  getMarketData,
  getLeaderboards,
  getTransactions,
  getUserById,
  getGameById,
  getDefiPoolById,
  getNftCollectionById,
  getNftById,
  getLaunchpadProjectById,
  getGovernanceProposalById,
  getGamingLeaderboard,
  getUserGamingStats,
  updateUser,
  addTransaction,
};
