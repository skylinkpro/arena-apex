const express = require("express");
const router = express.Router();

const {
  getGames,
  getGameById,
  getGamingLeaderboard,
  getUserGamingStats,
  addTransaction,
} = require("../data/mockData.js");

// Get all games
router.get("/games", (req, res) => {
  try {
    const games = getGames();
    res.json({
      success: true,
      data: games,
      count: games.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch games",
      message: error.message,
    });
  }
});

// Get game by ID
router.get("/games/:id", (req, res) => {
  try {
    const game = getGameById(req.params.id);
    if (!game) {
      return res.status(404).json({
        success: false,
        error: "Game not found",
      });
    }
    res.json({
      success: true,
      data: game,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch game",
      message: error.message,
    });
  }
});

// Get gaming leaderboard
router.get("/leaderboard", (req, res) => {
  try {
    const leaderboard = getGamingLeaderboard();
    res.json({
      success: true,
      data: leaderboard,
      count: leaderboard.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch leaderboard",
      message: error.message,
    });
  }
});

// Get user gaming statistics
router.get("/user/:userId/stats", (req, res) => {
  try {
    const stats = getUserGamingStats(req.params.userId);
    if (!stats) {
      return res.status(404).json({
        success: false,
        error: "User stats not found",
      });
    }
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch user stats",
      message: error.message,
    });
  }
});

// Start a game session
router.post("/games/:id/start", (req, res) => {
  try {
    const { userId } = req.body;
    const gameId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Simulate starting a game session
    const sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Add transaction record
    addTransaction({
      id: `tx_${Date.now()}`,
      type: "game_start",
      userId,
      gameId,
      amount: 0,
      status: "completed",
      timestamp: new Date().toISOString(),
      metadata: {
        sessionId,
        gameId,
      },
    });

    res.json({
      success: true,
      data: {
        sessionId,
        gameId,
        startTime: new Date().toISOString(),
        message: "Game session started successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to start game session",
      message: error.message,
    });
  }
});

// End a game session and claim rewards
router.post("/games/:id/end", (req, res) => {
  try {
    const { userId, sessionId, score, rewards } = req.body;
    const gameId = req.params.id;

    if (!userId || !sessionId) {
      return res.status(400).json({
        success: false,
        error: "User ID and session ID are required",
      });
    }

    // Simulate ending a game session and claiming rewards
    const totalRewards = rewards || Math.floor(Math.random() * 100) + 10;

    // Add transaction record
    addTransaction({
      id: `tx_${Date.now()}`,
      type: "game_reward",
      userId,
      gameId,
      amount: totalRewards,
      status: "completed",
      timestamp: new Date().toISOString(),
      metadata: {
        sessionId,
        gameId,
        score: score || Math.floor(Math.random() * 1000),
        rewards: totalRewards,
      },
    });

    res.json({
      success: true,
      data: {
        sessionId,
        gameId,
        endTime: new Date().toISOString(),
        score: score || Math.floor(Math.random() * 1000),
        rewards: totalRewards,
        message: "Game session ended and rewards claimed successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to end game session",
      message: error.message,
    });
  }
});

// Get tournament information
router.get("/tournaments", (req, res) => {
  try {
    const tournaments = [
      {
        id: "tournament_1",
        name: "Weekly Gaming Championship",
        game: "Crypto Warriors",
        startDate: "2024-01-15T10:00:00Z",
        endDate: "2024-01-22T10:00:00Z",
        prizePool: 10000,
        participants: 156,
        status: "active",
        entryFee: 50,
      },
      {
        id: "tournament_2",
        name: "Monthly DeFi Gaming League",
        game: "Yield Quest",
        startDate: "2024-02-01T10:00:00Z",
        endDate: "2024-02-29T10:00:00Z",
        prizePool: 25000,
        participants: 89,
        status: "upcoming",
        entryFee: 100,
      },
    ];

    res.json({
      success: true,
      data: tournaments,
      count: tournaments.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch tournaments",
      message: error.message,
    });
  }
});

// Join a tournament
router.post("/tournaments/:id/join", (req, res) => {
  try {
    const { userId } = req.body;
    const tournamentId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User ID is required",
      });
    }

    // Simulate joining a tournament
    const joinId = `join_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Add transaction record
    addTransaction({
      id: `tx_${Date.now()}`,
      type: "tournament_join",
      userId,
      gameId: tournamentId,
      amount: -100, // Entry fee
      status: "completed",
      timestamp: new Date().toISOString(),
      metadata: {
        tournamentId,
        joinId,
        entryFee: 100,
      },
    });

    res.json({
      success: true,
      data: {
        joinId,
        tournamentId,
        joinTime: new Date().toISOString(),
        message: "Successfully joined tournament",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to join tournament",
      message: error.message,
    });
  }
});

module.exports = router;
