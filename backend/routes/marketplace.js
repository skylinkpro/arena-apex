const express = require("express");
const {
  getMarketData,
  getGames,
  getDefiPools,
  getNftCollections,
  getGovernanceProposals,
} = require("../data/mockData.js");

const router = express.Router();

// Get platform overview statistics
router.get("/overview", (req, res) => {
  try {
    const marketData = getMarketData();
    const games = getGames();
    const pools = getDefiPools();
    const collections = getNftCollections();
    const proposals = getGovernanceProposals();

    const overview = {
      platform: {
        totalUsers: marketData.totalUsers,
        totalVolume: marketData.totalVolume,
        totalTransactions: marketData.totalTransactions,
        platformFees: marketData.platformFees,
        activeGames: games.filter((g) => g.status === "Live").length,
        activePools: pools.length,
        totalNFTs: marketData.totalNFTs,
      },
      tokenomics: {
        arnapexPrice: marketData.arnapexPrice,
        arnapexMarketCap: marketData.arnapexMarketCap,
        arnapexCirculatingSupply: marketData.arnapexCirculatingSupply,
        arnapexTotalSupply: marketData.arnapexTotalSupply,
        priceChange24h: 5.2,
        priceChange7d: 12.8,
        priceChange30d: -3.5,
      },
      gaming: {
        totalGames: games.length,
        liveGames: games.filter((g) => g.status === "Live").length,
        totalPlayers: games.reduce((sum, g) => sum + g.players, 0),
        averageRewards:
          games.reduce((sum, g) => sum + g.rewards.daily, 0) / games.length,
        totalRewardsDistributed: 1250000,
      },
      defi: {
        totalPools: pools.length,
        totalValueLocked: pools.reduce((sum, p) => sum + p.tvl, 0),
        totalVolume24h: pools.reduce((sum, p) => sum + p.volume24h, 0),
        averageAPY: pools.reduce((sum, p) => sum + p.apy, 0) / pools.length,
        totalFees24h: pools.reduce((sum, p) => sum + p.fees24h, 0),
      },
      nft: {
        totalCollections: collections.length,
        totalNFTs: marketData.totalNFTs,
        totalVolume: collections.reduce((sum, c) => sum + c.volume, 0),
        averageFloorPrice:
          collections.reduce((sum, c) => sum + c.floorPrice, 0) /
          collections.length,
        totalOwners: collections.reduce((sum, c) => sum + c.owners, 0),
      },
      governance: {
        totalProposals: proposals.length,
        activeProposals: proposals.filter((p) => p.status === "Active").length,
        totalVotes: proposals.reduce(
          (sum, p) => sum + p.votesFor + p.votesAgainst,
          0
        ),
        averageParticipation: 78.5,
        totalVotingPower: 50000000,
      },
    };

    res.json({
      success: true,
      data: overview,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch platform overview",
      message: error.message,
    });
  }
});

// Get gaming analytics
router.get("/gaming", (req, res) => {
  try {
    const games = getGames();
    const { period = "7d" } = req.query;

    // Mock gaming analytics data
    const gamingAnalytics = {
      period,
      overview: {
        totalGames: games.length,
        liveGames: games.filter((g) => g.status === "Live").length,
        upcomingGames: games.filter((g) => g.status === "Coming Soon").length,
        totalPlayers: games.reduce((sum, g) => sum + g.players, 0),
        averageRating:
          games.reduce((sum, g) => sum + g.rating, 0) / games.length,
      },
      playerMetrics: {
        dailyActiveUsers: 3200,
        weeklyActiveUsers: 8900,
        monthlyActiveUsers: 15600,
        averageSessionDuration: "25 minutes",
        retentionRate: {
          day1: 85,
          day7: 62,
          day30: 41,
        },
      },
      revenueMetrics: {
        totalRewardsDistributed: 1250000,
        averageDailyRewards: 45000,
        rewardsByGame: games.map((game) => ({
          game: game.title,
          totalRewards: game.rewards.monthly * 30,
          players: game.players,
          averagePerPlayer: (game.rewards.monthly * 30) / game.players,
        })),
      },
      gamePerformance: games.map((game) => ({
        name: game.title,
        status: game.status,
        players: game.players,
        maxPlayers: game.maxPlayers,
        utilization: (game.players / game.maxPlayers) * 100,
        rating: game.rating,
        reviews: game.reviews,
        rewards: game.rewards.daily,
      })),
      trends: {
        newPlayers: {
          daily: 156,
          weekly: 890,
          monthly: 3200,
        },
        gameLaunches: {
          last30Days: 1,
          next30Days: 1,
          totalLaunched: 3,
        },
      },
    };

    res.json({
      success: true,
      data: gamingAnalytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch gaming analytics",
      message: error.message,
    });
  }
});

// Get DeFi analytics
router.get("/defi", (req, res) => {
  try {
    const pools = getDefiPools();
    const { period = "7d" } = req.query;

    // Mock DeFi analytics data
    const defiAnalytics = {
      period,
      overview: {
        totalPools: pools.length,
        totalValueLocked: pools.reduce((sum, p) => sum + p.tvl, 0),
        totalVolume24h: pools.reduce((sum, p) => sum + p.volume24h, 0),
        totalVolume7d: pools.reduce((sum, p) => sum + p.volume7d, 0),
        averageAPY: pools.reduce((sum, p) => sum + p.apy, 0) / pools.length,
      },
      poolMetrics: {
        byType: {
          "Gaming Pool": pools.filter((p) => p.type === "Gaming Pool").length,
          "Stable Pool": pools.filter((p) => p.type === "Stable Pool").length,
          "Blue Chip": pools.filter((p) => p.type === "Blue Chip").length,
          "New Launch": pools.filter((p) => p.type === "New Launch").length,
        },
        byBlockchain: {
          Ethereum: pools.filter((p) => p.blockchain === "Ethereum").length,
          Polygon: pools.filter((p) => p.blockchain === "Polygon").length,
          "Binance Smart Chain": pools.filter(
            (p) => p.blockchain === "Binance Smart Chain"
          ).length,
        },
        topPerforming: pools
          .sort((a, b) => b.apy - a.apy)
          .slice(0, 5)
          .map((pool) => ({
            pair: pool.pair,
            apy: pool.apy,
            tvl: pool.tvl,
            volume24h: pool.volume24h,
          })),
      },
      userMetrics: {
        uniqueUsers: 3200,
        activeLiquidityProviders: 890,
        averageTVLPerUser: 7500,
        topUsers: [
          { address: "0x1234...", tvl: 125000, pools: 3 },
          { address: "0x5678...", tvl: 89000, pools: 2 },
          { address: "0x9abc...", tvl: 67000, pools: 4 },
        ],
      },
      volumeAnalysis: {
        hourly: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          volume: Math.floor(Math.random() * 50000) + 10000,
        })),
        daily: Array.from({ length: 7 }, (_, i) => ({
          day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          volume: Math.floor(Math.random() * 200000) + 50000,
        })),
      },
      riskMetrics: {
        averageRisk: "Medium",
        riskDistribution: {
          Low: pools.filter((p) => p.risk === "Low").length,
          Medium: pools.filter((p) => p.risk === "Medium").length,
          High: pools.filter((p) => p.risk === "High").length,
        },
      },
    };

    res.json({
      success: true,
      data: defiAnalytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch DeFi analytics",
      message: error.message,
    });
  }
});

// Get NFT analytics
router.get("/nft", (req, res) => {
  try {
    const collections = getNftCollections();
    const { period = "7d" } = req.query;

    // Mock NFT analytics data
    const nftAnalytics = {
      period,
      overview: {
        totalCollections: collections.length,
        totalNFTs: 19000,
        totalVolume: collections.reduce((sum, c) => sum + c.volume, 0),
        totalOwners: collections.reduce((sum, c) => sum + c.owners, 0),
        averageFloorPrice:
          collections.reduce((sum, c) => sum + c.floorPrice, 0) /
          collections.length,
      },
      collectionMetrics: {
        byCategory: {
          Gaming: collections.filter((c) => c.category === "Gaming").length,
          Art: collections.filter((c) => c.category === "Art").length,
          "Virtual Real Estate": collections.filter(
            (c) => c.category === "Virtual Real Estate"
          ).length,
        },
        byBlockchain: {
          Ethereum: collections.filter((c) => c.blockchain === "Ethereum")
            .length,
          Polygon: collections.filter((c) => c.blockchain === "Polygon").length,
          "Binance Smart Chain": collections.filter(
            (c) => c.blockchain === "Binance Smart Chain"
          ).length,
        },
        topCollections: collections
          .sort((a, b) => b.volume - a.volume)
          .slice(0, 5)
          .map((collection) => ({
            name: collection.name,
            volume: collection.volume,
            items: collection.items,
            owners: collection.owners,
            floorPrice: collection.floorPrice,
          })),
      },
      tradingMetrics: {
        totalSales: 1250,
        averageSalePrice: 2.8,
        salesByPriceRange: {
          "0-1 ETH": 450,
          "1-5 ETH": 380,
          "5-10 ETH": 280,
          "10+ ETH": 140,
        },
        volumeByDay: Array.from({ length: 7 }, (_, i) => ({
          day: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
          volume: Math.floor(Math.random() * 50) + 10,
        })),
      },
      userMetrics: {
        uniqueBuyers: 890,
        uniqueSellers: 450,
        averageNFTsPerUser: 4.2,
        topCollectors: [
          { address: "0x1234...", nfts: 45, value: 125000 },
          { address: "0x5678...", nfts: 32, value: 89000 },
          { address: "0x9abc...", nfts: 28, value: 67000 },
        ],
      },
      rarityAnalysis: {
        distribution: {
          Common: 65,
          Rare: 25,
          Epic: 8,
          Legendary: 2,
        },
        averagePrices: {
          Common: 0.5,
          Rare: 2.1,
          Epic: 8.5,
          Legendary: 25.0,
        },
      },
    };

    res.json({
      success: true,
      data: nftAnalytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch NFT analytics",
      message: error.message,
    });
  }
});

// Get governance analytics
router.get("/governance", (req, res) => {
  try {
    const proposals = getGovernanceProposals();
    const { period = "7d" } = req.query;

    // Mock governance analytics data
    const governanceAnalytics = {
      period,
      overview: {
        totalProposals: proposals.length,
        activeProposals: proposals.filter((p) => p.status === "Active").length,
        pendingProposals: proposals.filter((p) => p.status === "Pending")
          .length,
        passedProposals: proposals.filter((p) => p.status === "Passed").length,
        totalVotes: proposals.reduce(
          (sum, p) => sum + p.votesFor + p.votesAgainst,
          0
        ),
      },
      proposalMetrics: {
        byType: {
          Treasury: proposals.filter((p) => p.type === "Treasury").length,
          Technical: proposals.filter((p) => p.type === "Technical").length,
          Governance: proposals.filter((p) => p.type === "Governance").length,
          Community: proposals.filter((p) => p.type === "Community").length,
        },
        byStatus: {
          Active: proposals.filter((p) => p.status === "Active").length,
          Pending: proposals.filter((p) => p.status === "Pending").length,
          Passed: proposals.filter((p) => p.status === "Passed").length,
          Rejected: proposals.filter((p) => p.status === "Rejected").length,
        },
        successRate:
          (proposals.filter((p) => p.status === "Passed").length /
            proposals.length) *
          100,
      },
      votingMetrics: {
        totalVotingPower: 50000000,
        activeVoters: 1250,
        averageParticipation: 78.5,
        participationByProposal: proposals.map((proposal) => ({
          title: proposal.title,
          totalVotes: proposal.votesFor + proposal.votesAgainst,
          participation:
            ((proposal.votesFor + proposal.votesAgainst) / proposal.quorum) *
            100,
        })),
      },
      userMetrics: {
        uniqueVoters: 890,
        averageVotingPower: 56000,
        topVoters: [
          { address: "0x1234...", votingPower: 2500000, proposals: 8 },
          { address: "0x5678...", votingPower: 1800000, proposals: 6 },
          { address: "0x9abc...", votingPower: 1200000, proposals: 5 },
        ],
      },
      trends: {
        proposalsByMonth: Array.from({ length: 6 }, (_, i) => ({
          month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 7),
          count: Math.floor(Math.random() * 5) + 1,
        })),
        participationTrend: {
          "Q1 2024": 72.5,
          "Q2 2024": 78.5,
          "Q3 2024": 81.2,
          "Q4 2024": 79.8,
        },
      },
    };

    res.json({
      success: true,
      data: governanceAnalytics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch governance analytics",
      message: error.message,
    });
  }
});

// Get real-time market data
router.get("/market-data", (req, res) => {
  try {
    const marketData = getMarketData();

    // Mock real-time data
    const realTimeData = {
      timestamp: new Date().toISOString(),
      arnapex: {
        price: marketData.arnapexPrice + (Math.random() - 0.5) * 0.1,
        change24h: 5.2,
        volume24h: 2500000,
        marketCap: marketData.arnapexMarketCap,
        circulatingSupply: marketData.arnapexCirculatingSupply,
      },
      topTokens: [
        { symbol: "Arnapex", price: 0.85, change24h: 5.2, volume: 2500000 },
        { symbol: "ETH", price: 3500, change24h: 2.1, volume: 15000000 },
        { symbol: "USDC", price: 1.0, change24h: 0.0, volume: 5000000 },
        { symbol: "GAME", price: 0.12, change24h: 15.8, volume: 800000 },
      ],
      trending: [
        { symbol: "Arnapex", volume: 2500000, change: 5.2 },
        { symbol: "GAME", volume: 800000, change: 15.8 },
        { symbol: "VAULT", volume: 450000, change: 8.9 },
      ],
    };

    res.json({
      success: true,
      data: realTimeData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch market data",
      message: error.message,
    });
  }
});

module.exports = router;
