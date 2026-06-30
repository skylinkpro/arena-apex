const express = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  getTransactions,
} = require("../data/mockData.js");

const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  try {
    const {
      limit = 50,
      offset = 0,
      sortBy = "level",
      sortOrder = "desc",
    } = req.query;

    let users = getUsers();

    // Sort users
    users.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "level":
          aValue = a.level || 0;
          bValue = b.level || 0;
          break;
        case "experience":
          aValue = a.experience || 0;
          bValue = b.experience || 0;
          break;
        case "joinDate":
          aValue = new Date(a.joinDate);
          bValue = new Date(b.joinDate);
          break;
        default:
          aValue = a.level || 0;
          bValue = b.level || 0;
      }

      if (sortOrder === "desc") {
        return bValue - aValue;
      }
      return aValue - bValue;
    });

    // Apply pagination
    const paginatedUsers = users.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      data: paginatedUsers,
      count: paginatedUsers.length,
      total: users.length,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < users.length,
      },
      filters: { sortBy, sortOrder },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
      message: error.message,
    });
  }
});

// Get user by ID
router.get("/:id", (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user",
      message: error.message,
    });
  }
});

// Get user profile
router.get("/:id/profile", (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Enhanced profile with additional data
    const profile = {
      ...user,
      stats: {
        totalGamesPlayed: 45,
        totalDeFiTransactions: 23,
        totalNFTsOwned: 12,
        totalRewards: 12500,
        totalStaked: 25000,
        governanceParticipation: 8,
      },
      achievements: [
        {
          name: "First Game",
          description: "Played your first game",
          earnedAt: "2024-01-15",
        },
        {
          name: "DeFi Pioneer",
          description: "Completed first DeFi transaction",
          earnedAt: "2024-01-20",
        },
        {
          name: "NFT Collector",
          description: "Owned 10+ NFTs",
          earnedAt: "2024-02-10",
        },
        {
          name: "Governance Voter",
          description: "Participated in 5+ proposals",
          earnedAt: "2024-03-01",
        },
      ],
      social: {
        followers: 156,
        following: 89,
        posts: 23,
        reputation: 4.8,
      },
    };

    res.json({
      success: true,
      data: profile,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user profile",
      message: error.message,
    });
  }
});

// Update user profile
router.put("/:id/profile", (req, res) => {
  try {
    const { username, email, avatar, bio, socialLinks } = req.body;

    if (!username && !email && !avatar && !bio && !socialLinks) {
      return res.status(400).json({
        success: false,
        error: "No fields to update",
      });
    }

    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Update user fields
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (avatar) updates.avatar = avatar;
    if (bio) updates.bio = bio;
    if (socialLinks) updates.socialLinks = socialLinks;

    const updatedUser = updateUser(req.params.id, updates);

    res.json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update profile",
      message: error.message,
    });
  }
});

// Get user's transaction history
router.get("/:id/transactions", (req, res) => {
  try {
    const { type, limit = 50, offset = 0 } = req.query;

    let transactions = getTransactions().filter(
      (tx) => tx.userId === req.params.id
    );

    // Filter by type
    if (type) {
      transactions = transactions.filter((tx) => tx.type === type);
    }

    // Sort by timestamp (newest first)
    transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Apply pagination
    const paginatedTransactions = transactions.slice(
      parseInt(offset),
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      data: paginatedTransactions,
      count: paginatedTransactions.length,
      total: transactions.length,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < transactions.length,
      },
      filters: { type },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch transaction history",
      message: error.message,
    });
  }
});

// Get user's portfolio summary
router.get("/:id/portfolio", (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Mock portfolio data
    const portfolio = {
      userId: req.params.id,
      username: user.username,
      totalValue: 125000,
      totalPnl: 25000,
      pnlPercentage: 25,
      assets: {
        tokens: {
          Arnapex: { amount: 15000, value: 12750, pnl: 2750 },
          ETH: { amount: 2.5, value: 8750, pnl: 1250 },
          USDC: { amount: 5000, value: 5000, pnl: 0 },
        },
        nfts: {
          total: 12,
          value: 45000,
          collections: [
            "CyberWarriors",
            "Digital Artifacts",
            "Quantum Vehicles",
          ],
        },
        staked: {
          total: 25000,
          rewards: 1800,
          apy: 145.2,
        },
      },
      recentActivity: [
        { type: "game_reward", amount: 250, timestamp: "2024-04-12" },
        { type: "nft_purchase", amount: 3200, timestamp: "2024-04-11" },
        { type: "liquidity_add", amount: 10000, timestamp: "2024-04-10" },
      ],
    };

    res.json({
      success: true,
      data: portfolio,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch portfolio",
      message: error.message,
    });
  }
});

// Get user's achievements
router.get("/:id/achievements", (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Mock achievements data
    const achievements = [
      {
        id: "ach_001",
        name: "First Game",
        description: "Played your first game on the platform",
        icon: "🎮",
        earnedAt: "2024-01-15",
        rarity: "Common",
        points: 10,
      },
      {
        id: "ach_002",
        name: "DeFi Pioneer",
        description: "Completed your first DeFi transaction",
        icon: "💎",
        earnedAt: "2024-01-20",
        rarity: "Common",
        points: 15,
      },
      {
        id: "ach_003",
        name: "NFT Collector",
        description: "Owned 10 or more NFTs",
        icon: "🖼️",
        earnedAt: "2024-02-10",
        rarity: "Rare",
        points: 25,
      },
      {
        id: "ach_004",
        name: "Governance Voter",
        description: "Participated in 5 or more governance proposals",
        icon: "🗳️",
        earnedAt: "2024-03-01",
        rarity: "Epic",
        points: 50,
      },
      {
        id: "ach_005",
        name: "Liquidity Provider",
        description: "Provided liquidity to DeFi pools",
        icon: "🏊",
        earnedAt: "2024-03-15",
        rarity: "Rare",
        points: 30,
      },
    ];

    const totalPoints = achievements.reduce((sum, ach) => sum + ach.points, 0);
    const achievementCount = achievements.length;

    res.json({
      success: true,
      data: {
        achievements,
        stats: {
          total: achievementCount,
          totalPoints,
          rarityBreakdown: {
            Common: achievements.filter((a) => a.rarity === "Common").length,
            Rare: achievements.filter((a) => a.rarity === "Rare").length,
            Epic: achievements.filter((a) => a.rarity === "Epic").length,
            Legendary: achievements.filter((a) => a.rarity === "Legendary")
              .length,
          },
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch achievements",
      message: error.message,
    });
  }
});

// Get user's social connections
router.get("/:id/connections", (req, res) => {
  try {
    const user = getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Mock social connections
    const connections = {
      followers: [
        {
          id: "user_002",
          username: "DeFiMaster",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DeFiMaster",
          followedAt: "2024-02-15",
        },
        {
          id: "user_003",
          username: "NFTArtist",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NFTArtist",
          followedAt: "2024-03-01",
        },
      ],
      following: [
        {
          id: "user_004",
          username: "GameDev",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GameDev",
          followedAt: "2024-01-20",
        },
        {
          id: "user_005",
          username: "BlockchainGuru",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=BlockchainGuru",
          followedAt: "2024-02-10",
        },
      ],
      mutualConnections: [
        {
          id: "user_006",
          username: "CryptoEnthusiast",
          avatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoEnthusiast",
        },
      ],
    };

    res.json({
      success: true,
      data: connections,
      stats: {
        followers: connections.followers.length,
        following: connections.following.length,
        mutual: connections.mutualConnections.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch connections",
      message: error.message,
    });
  }
});

// Follow user
router.post("/:id/follow", (req, res) => {
  try {
    const { followerId, followerUsername } = req.body;

    if (!followerId || !followerUsername) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    if (followerId === req.params.id) {
      return res.status(400).json({
        success: false,
        error: "Cannot follow yourself",
      });
    }

    // Mock follow action
    const followResult = {
      followId: `follow_${Date.now()}`,
      followerId,
      followerUsername,
      followingId: req.params.id,
      followTime: new Date().toISOString(),
      status: "followed",
    };

    res.json({
      success: true,
      data: followResult,
      message: `Successfully followed user`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to follow user",
      message: error.message,
    });
  }
});

// Unfollow user
router.delete("/:id/follow", (req, res) => {
  try {
    const { followerId } = req.body;

    if (!followerId) {
      return res.status(400).json({
        success: false,
        error: "Missing follower ID",
      });
    }

    // Mock unfollow action
    const unfollowResult = {
      followerId,
      followingId: req.params.id,
      unfollowTime: new Date().toISOString(),
      status: "unfollowed",
    };

    res.json({
      success: true,
      data: unfollowResult,
      message: `Successfully unfollowed user`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to unfollow user",
      message: error.message,
    });
  }
});

module.exports = router;
