const express = require("express");
const {
  getDefiPools,
  getDefiPoolById,
  getMarketData,
  getLeaderboards,
  addTransaction,
} = require("../data/mockData.js");

const router = express.Router();

// Get all DeFi pools
router.get("/pools", (req, res) => {
  try {
    const pools = getDefiPools();
    res.json({
      success: true,
      data: pools,
      count: pools.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch DeFi pools",
      message: error.message,
    });
  }
});

// Get pool by ID
router.get("/pools/:id", (req, res) => {
  try {
    const pool = getDefiPoolById(req.params.id);
    if (!pool) {
      return res.status(404).json({
        success: false,
        error: "Pool not found",
      });
    }

    res.json({
      success: true,
      data: pool,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch pool",
      message: error.message,
    });
  }
});

// Get DeFi market overview
router.get("/overview", (req, res) => {
  try {
    const marketData = getMarketData();
    const pools = getDefiPools();

    const overview = {
      totalValueLocked: marketData.totalVolume,
      totalVolume24h: pools.reduce((sum, pool) => sum + pool.volume24h, 0),
      totalVolume7d: pools.reduce((sum, pool) => sum + pool.volume7d, 0),
      activePools: pools.length,
      averageAPY: pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length,
      totalFees24h: pools.reduce((sum, pool) => sum + pool.fees24h, 0),
      topPerformingPool: pools.reduce((max, pool) =>
        pool.apy > max.apy ? pool : max
      ),
      marketTrend: "bullish",
      lastUpdated: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: overview,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch DeFi overview",
      message: error.message,
    });
  }
});

// Get DeFi leaderboard
router.get("/leaderboard", (req, res) => {
  try {
    const leaderboards = getLeaderboards();
    res.json({
      success: true,
      data: leaderboards.defi,
      count: leaderboards.defi.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch leaderboard",
      message: error.message,
    });
  }
});

// Add liquidity to pool
router.post("/pools/:id/add-liquidity", (req, res) => {
  try {
    const { userId, token0Amount, token1Amount, walletAddress } = req.body;

    if (!userId || !token0Amount || !token1Amount || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const pool = getDefiPoolById(req.params.id);
    if (!pool) {
      return res.status(404).json({
        success: false,
        error: "Pool not found",
      });
    }

    // Mock liquidity addition
    const liquidityResult = {
      transactionId: `tx_${Date.now()}`,
      poolId: pool.id,
      poolName: pool.pair,
      userId,
      walletAddress,
      token0Amount,
      token1Amount,
      lpTokensReceived: Math.min(token0Amount, token1Amount) * 0.95, // 5% slippage
      timestamp: new Date().toISOString(),
      status: "completed",
      gasUsed: "0.002",
      gasPrice: "25",
    };

    // Add transaction to history
    addTransaction({
      type: "add_liquidity",
      poolId: pool.id,
      userId,
      amount: token0Amount + token1Amount,
      status: "success",
    });

    res.json({
      success: true,
      data: liquidityResult,
      message: `Successfully added liquidity to ${pool.pair}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to add liquidity",
      message: error.message,
    });
  }
});

// Remove liquidity from pool
router.post("/pools/:id/remove-liquidity", (req, res) => {
  try {
    const { userId, lpTokens, walletAddress } = req.body;

    if (!userId || !lpTokens || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    const pool = getDefiPoolById(req.params.id);
    if (!pool) {
      return res.status(404).json({
        success: false,
        error: "Pool not found",
      });
    }

    // Mock liquidity removal
    const removalResult = {
      transactionId: `tx_${Date.now()}`,
      poolId: pool.id,
      poolName: pool.pair,
      userId,
      walletAddress,
      lpTokensBurned: lpTokens,
      token0Received: lpTokens * 0.48, // Approximate split
      token1Received: lpTokens * 0.48,
      feesEarned: lpTokens * 0.04,
      timestamp: new Date().toISOString(),
      status: "completed",
      gasUsed: "0.003",
      gasPrice: "25",
    };

    // Add transaction to history
    addTransaction({
      type: "remove_liquidity",
      poolId: pool.id,
      userId,
      amount: lpTokens,
      status: "success",
    });

    res.json({
      success: true,
      data: removalResult,
      message: `Successfully removed liquidity from ${pool.pair}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to remove liquidity",
      message: error.message,
    });
  }
});

// Swap tokens
router.post("/swap", (req, res) => {
  try {
    const {
      userId,
      tokenIn,
      tokenOut,
      amountIn,
      amountOutMin,
      walletAddress,
      slippage,
    } = req.body;

    if (!userId || !tokenIn || !tokenOut || !amountIn || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Mock swap execution
    const swapResult = {
      transactionId: `tx_${Date.now()}`,
      userId,
      walletAddress,
      tokenIn,
      tokenOut,
      amountIn,
      amountOut: amountIn * 0.997, // 0.3% fee
      amountOutMin: amountOutMin || amountIn * 0.99,
      slippage: slippage || 1,
      priceImpact: 0.15,
      fee: amountIn * 0.003,
      timestamp: new Date().toISOString(),
      status: "completed",
      gasUsed: "0.005",
      gasPrice: "25",
    };

    // Add transaction to history
    addTransaction({
      type: "swap",
      userId,
      tokenIn,
      tokenOut,
      amountIn,
      amountOut: swapResult.amountOut,
      status: "success",
    });

    res.json({
      success: true,
      data: swapResult,
      message: `Successfully swapped ${amountIn} ${tokenIn} for ${swapResult.amountOut} ${tokenOut}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to execute swap",
      message: error.message,
    });
  }
});

// Get yield farming opportunities
router.get("/yield-farming", (req, res) => {
  try {
    const yieldOpportunities = [
      {
        id: "yield_001",
        name: "Arnapex-ETH LP Staking",
        pool: "Arnapex/ETH",
        apy: 145.2,
        totalStaked: 1200000,
        rewards: {
          Arnapex: 500,
          ETH: 0.8,
        },
        lockPeriod: "30 days",
        risk: "Medium",
        minStake: 100,
      },
      {
        id: "yield_002",
        name: "USDC-Arnapex LP Staking",
        pool: "USDC/Arnapex",
        apy: 89.5,
        totalStaked: 900000,
        rewards: {
          Arnapex: 300,
          USDC: 1500,
        },
        lockPeriod: "7 days",
        risk: "Low",
        minStake: 50,
      },
      {
        id: "yield_003",
        name: "GAME Token Staking",
        pool: "GAME/Arnapex",
        apy: 234.7,
        totalStaked: 445000,
        rewards: {
          Arnapex: 800,
          GAME: 2500,
        },
        lockPeriod: "90 days",
        risk: "High",
        minStake: 200,
      },
    ];

    res.json({
      success: true,
      data: yieldOpportunities,
      count: yieldOpportunities.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch yield farming opportunities",
      message: error.message,
    });
  }
});

// Stake tokens for yield farming
router.post("/yield-farming/:id/stake", (req, res) => {
  try {
    const { userId, amount, walletAddress, lockPeriod } = req.body;

    if (!userId || !amount || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Mock staking
    const stakingResult = {
      transactionId: `tx_${Date.now()}`,
      yieldId: req.params.id,
      userId,
      walletAddress,
      amount,
      lockPeriod: lockPeriod || "30 days",
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedRewards: amount * 0.15, // 15% APY estimate
      status: "active",
      gasUsed: "0.004",
      gasPrice: "25",
    };

    // Add transaction to history
    addTransaction({
      type: "stake",
      yieldId: req.params.id,
      userId,
      amount,
      status: "success",
    });

    res.json({
      success: true,
      data: stakingResult,
      message: `Successfully staked ${amount} tokens for yield farming`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to stake tokens",
      message: error.message,
    });
  }
});

// Get user's DeFi portfolio
router.get("/user/:userId/portfolio", (req, res) => {
  try {
    // Mock user portfolio
    const portfolio = {
      userId: req.params.userId,
      totalValue: 125000,
      totalPnl: 25000,
      pnlPercentage: 25,
      positions: [
        {
          poolId: "pool_001",
          poolName: "Arnapex/ETH",
          liquidity: 50000,
          pnl: 12000,
          apy: 145.2,
          rewards: 2500,
        },
        {
          poolId: "pool_002",
          poolName: "USDC/Arnapex",
          liquidity: 30000,
          pnl: 8000,
          apy: 89.5,
          rewards: 1500,
        },
      ],
      staking: [
        {
          yieldId: "yield_001",
          name: "Arnapex-ETH LP Staking",
          staked: 25000,
          rewards: 1800,
          apy: 145.2,
        },
      ],
      recentTransactions: [
        { type: "add_liquidity", amount: 10000, timestamp: "2024-04-12" },
        { type: "swap", amount: 5000, timestamp: "2024-04-11" },
        { type: "stake", amount: 15000, timestamp: "2024-04-10" },
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

module.exports = router;
