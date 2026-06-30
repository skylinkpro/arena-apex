const express = require("express");
const axios = require("axios");
const path = require("path");

/**
 * Mock data layer
 * Replace with database or blockchain integration in production
 */
const {
  getGovernanceProposals,
  getGovernanceProposalById,
  addTransaction,
} = require("../data/mockData.js");

const router = express.Router();

require("dotenv").config({
  path: path.resolve(__dirname, "../../env.example"),
});

/**
 * =========================================================
 * GET /proposals
 * ---------------------------------------------------------
 * Fetch all governance proposals with optional filters
 * Query params:
 * - status
 * - type
 * - creator
 * =========================================================
 */
router.get("/proposals", (req, res) => {
  try {
    const { status, type, creator } = req.query;
    let proposals = getGovernanceProposals();

    // Filter by status
    if (status) {
      proposals = proposals.filter((proposal) => proposal.status === status);
    }

    // Filter by type
    if (type) {
      proposals = proposals.filter((proposal) => proposal.type === type);
    }

    // Filter by creator
    if (creator) {
      proposals = proposals.filter((proposal) => proposal.creator === creator);
    }

    res.json({
      success: true,
      data: proposals,
      count: proposals.length,
      filters: { status, type, creator },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch governance proposals",
      message: error.message,
    });
  }
});

/**
 * =========================================================
 * GET /proposals/:id
 * ---------------------------------------------------------
 * Fetch a single proposal by ID
 * =========================================================
 */
router.get("/proposals/:id", (req, res) => {
  try {
    const proposal = getGovernanceProposalById(req.params.id);
    if (!proposal) {
      return res.status(404).json({
        success: false,
        error: "Proposal not found",
      });
    }

    res.json({
      success: true,
      data: proposal,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch proposal",
      message: error.message,
    });
  }
});

/**
 * =========================================================
 * POST /proposals
 * ---------------------------------------------------------
 * Create a new governance proposal
 * =========================================================
 */
router.post("/proposals", (req, res) => {
  try {
    const {
      title,
      description,
      type,
      quorum,
      executionDelay,
      creator,
      walletAddress,
      discussion,
    } = req.body;

    if (
      !title ||
      !description ||
      !type ||
      !quorum ||
      !creator ||
      !walletAddress
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Mock proposal creation
    const newProposal = {
      id: `proposal_${Date.now()}`,
      title,
      description,
      status: "Pending",
      votesFor: 0,
      votesAgainst: 0,
      timeLeft: "7 days",
      quorum: parseFloat(quorum),
      type,
      creator,
      walletAddress,
      createdDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      blockchain: "Ethereum",
      contractAddress: `0xGovernance${Date.now()}`,
      discussion:
        discussion || `https://forum.arnapex.com/proposal-${Date.now()}`,
      executionDelay: executionDelay || "2 days",
      votes: [],
      comments: [],
    };

    // Add transaction to history
    addTransaction({
      type: "create_proposal",
      userId: creator,
      proposalTitle: title,
      status: "success",
    });

    res.json({
      success: true,
      data: newProposal,
      message: `Proposal "${title}" created successfully`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create proposal",
      message: error.message,
    });
  }
});

/**
 * =========================================================
 * POST /proposals/:id/vote
 * ---------------------------------------------------------
 * Submit a vote on a governance proposal
 * =========================================================
 */
router.post("/proposals/:id/vote", (req, res) => {
  try {
    const { userId, username, vote, votingPower, walletAddress, reason } =
      req.body;

    if (!userId || !username || !vote || !votingPower || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    if (!["for", "against", "abstain"].includes(vote)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid vote. Must be "for", "against", or "abstain"',
      });
    }

    const proposal = getGovernanceProposalById(req.params.id);
    if (!proposal) {
      return res.status(404).json({
        success: false,
        error: "Proposal not found",
      });
    }

    if (proposal.status !== "Active" && proposal.status !== "Pending") {
      return res.status(400).json({
        success: false,
        error: "Proposal is not accepting votes",
      });
    }

    // Mock voting
    const voteResult = {
      voteId: `vote_${Date.now()}`,
      proposalId: proposal.id,
      proposalTitle: proposal.title,
      userId,
      username,
      vote,
      votingPower: parseFloat(votingPower),
      walletAddress,
      reason: reason || null,
      voteTime: new Date().toISOString(),
      status: "confirmed",
      gasUsed: "0.003",
      gasPrice: "25",
    };

    // Add transaction to history
    addTransaction({
      type: "vote_proposal",
      proposalId: proposal.id,
      userId,
      vote,
      votingPower,
      status: "success",
    });

    res.json({
      success: true,
      data: voteResult,
      message: `Vote "${vote}" recorded successfully for proposal "${proposal.title}"`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to record vote",
      message: error.message,
    });
  }
});

// Get governance statistics
router.get("/stats", (req, res) => {
  try {
    const proposals = getGovernanceProposals();

    const stats = {
      totalProposals: proposals.length,
      totalVotes: proposals.reduce(
        (sum, p) => sum + p.votesFor + p.votesAgainst,
        0,
      ),
      proposalsByStatus: {
        Active: proposals.filter((p) => p.status === "Active").length,
        Pending: proposals.filter((p) => p.status === "Pending").length,
        Passed: proposals.filter((p) => p.status === "Passed").length,
        Rejected: proposals.filter((p) => p.status === "Rejected").length,
      },
      proposalsByType: {
        Treasury: proposals.filter((p) => p.type === "Treasury").length,
        Technical: proposals.filter((p) => p.type === "Technical").length,
        Governance: proposals.filter((p) => p.type === "Governance").length,
        Community: proposals.filter((p) => p.type === "Community").length,
      },
      totalVotingPower: 50000000, // Mock total Arnapex tokens
      activeVoters: 1250,
      averageParticipation: 78.5,
      recentProposals: proposals
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
        .slice(0, 5)
        .map((proposal) => ({
          title: proposal.title,
          status: proposal.status,
          votesFor: proposal.votesFor,
          votesAgainst: proposal.votesAgainst,
          timeLeft: proposal.timeLeft,
        })),
    };

    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch governance stats",
      message: error.message,
    });
  }
});

// Get user's voting history
router.get("/user/:userId/voting-history", (req, res) => {
  try {
    // Mock user voting history
    const votingHistory = [
      {
        proposalId: "proposal_001",
        proposalTitle: "Increase Gaming Rewards Pool",
        vote: "for",
        votingPower: 5000,
        voteTime: "2024-04-10",
        proposalStatus: "Active",
      },
      {
        proposalId: "proposal_003",
        proposalTitle: "New NFT Royalty Structure",
        vote: "for",
        votingPower: 3000,
        voteTime: "2024-03-25",
        proposalStatus: "Passed",
      },
    ];

    res.json({
      success: true,
      data: votingHistory,
      count: votingHistory.length,
      totalVotingPower: votingHistory.reduce(
        (sum, v) => sum + v.votingPower,
        0,
      ),
      votesFor: votingHistory.filter((v) => v.vote === "for").length,
      votesAgainst: votingHistory.filter((v) => v.vote === "against").length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch voting history",
      message: error.message,
    });
  }
});

// Get active proposals
router.get("/active", (req, res) => {
  try {
    const proposals = getGovernanceProposals().filter(
      (proposal) => proposal.status === "Active",
    );

    // Sort by end date (ascending)
    proposals.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

    res.json({
      success: true,
      data: proposals,
      count: proposals.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch active proposals",
      message: error.message,
    });
  }
});

// Get pending proposals
router.get("/pending", (req, res) => {
  try {
    const proposals = getGovernanceProposals().filter(
      (proposal) => proposal.status === "Pending",
    );

    // Sort by creation date (descending)
    proposals.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

    res.json({
      success: true,
      data: proposals,
      count: proposals.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch pending proposals",
      message: error.message,
    });
  }
});

// Get proposal discussion
router.get("/proposals/:id/discussion", (req, res) => {
  try {
    const proposal = getGovernanceProposalById(req.params.id);
    if (!proposal) {
      return res.status(404).json({
        success: false,
        error: "Proposal not found",
      });
    }

    // Mock discussion data
    const discussion = {
      proposalId: proposal.id,
      proposalTitle: proposal.title,
      totalComments: 45,
      totalReplies: 128,
      participants: 23,
      comments: [
        {
          id: "comment_001",
          author: "CryptoWarrior",
          content:
            "This proposal makes a lot of sense for the gaming ecosystem. I support it!",
          timestamp: "2024-04-10T10:30:00Z",
          likes: 12,
          replies: 3,
          authorAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoWarrior",
        },
        {
          id: "comment_002",
          author: "DeFiMaster",
          content:
            "I have some concerns about the economic impact. Can we discuss the numbers?",
          timestamp: "2024-04-10T11:15:00Z",
          likes: 8,
          replies: 7,
          authorAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=DeFiMaster",
        },
      ],
    };

    res.json({
      success: true,
      data: discussion,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch discussion",
      message: error.message,
    });
  }
});

module.exports = router;
