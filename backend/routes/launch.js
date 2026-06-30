const express = require('express');
const { getLaunchpadProjects, 
  getLaunchpadProjectById,
  addTransaction 
 } = require('../data/mockData.js');

const router = express.Router();

// Get all launchpad projects
router.get('/projects', (req, res) => {
  try {
    const { status, type, blockchain } = req.query;
    let projects = getLaunchpadProjects();
    
    // Filter by status
    if (status) {
      projects = projects.filter(project => project.status === status);
    }
    
    // Filter by type
    if (type) {
      projects = projects.filter(project => project.type === type);
    }
    
    // Filter by blockchain
    if (blockchain) {
      projects = projects.filter(project => project.blockchain === blockchain);
    }
    
    res.json({
      success: true,
      data: projects,
      count: projects.length,
      filters: { status, type, blockchain },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch launchpad projects',
      message: error.message
    });
  }
});

// Get project by ID
router.get('/projects/:id', (req, res) => {
  try {
    const project = getLaunchpadProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.json({
      success: true,
      data: project,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
      message: error.message
    });
  }
});

// Participate in IDO
router.post('/projects/:id/participate', (req, res) => {
  try {
    const { userId, username, amount, walletAddress, referralCode } = req.body;
    
    if (!userId || !username || !amount || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const project = getLaunchpadProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    if (project.status !== 'Live') {
      return res.status(400).json({
        success: false,
        error: 'Project is not accepting participants'
      });
    }
    
    if (project.raised + amount > project.target) {
      return res.status(400).json({
        success: false,
        error: 'Participation amount exceeds remaining target'
      });
    }
    
    // Mock participation
    const participation = {
      participationId: `participation_${Date.now()}`,
      projectId: project.id,
      projectName: project.name,
      userId,
      username,
      amount,
      walletAddress,
      referralCode: referralCode || null,
      participationTime: new Date().toISOString(),
      tokensToReceive: amount / project.tokenPrice,
      status: 'confirmed',
      gasUsed: '0.006',
      gasPrice: '25'
    };
    
    // Add transaction to history
    addTransaction({
      type: 'ido_participation',
      projectId: project.id,
      userId,
      amount,
      status: 'success'
    });
    
    res.json({
      success: true,
      data: participation,
      message: `Successfully participated in ${project.name} IDO`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to participate in IDO',
      message: error.message
    });
  }
});

// Submit new project for launchpad
router.post('/submit-project', (req, res) => {
  try {
    const {
      name,
      type,
      description,
      blockchain,
      target,
      tokenPrice,
      tokenSymbol,
      totalSupply,
      vesting,
      team,
      social,
      documents,
      creator,
      walletAddress
    } = req.body;
    
    if (!name || !type || !description || !blockchain || !target || !tokenPrice || !tokenSymbol || !creator || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Mock project submission
    const newProject = {
      id: `project_${Date.now()}`,
      name,
      type,
      description,
      image: '🚀',
      status: 'Pending Review',
      raised: 0,
      target: parseFloat(target),
      participants: 0,
      timeLeft: 'TBA',
      progress: 0,
      blockchain,
      contractAddress: `0x${name.replace(/\s+/g, '')}${Date.now()}`,
      launchDate: null,
      endDate: null,
      tokenPrice: parseFloat(tokenPrice),
      tokenSymbol,
      totalSupply: parseInt(totalSupply),
      vesting: vesting || '6 months linear',
      team: team || [],
      social: social || {},
      documents: documents || [],
      creator,
      walletAddress,
      submittedAt: new Date().toISOString(),
      reviewStatus: 'pending',
      reviewNotes: []
    };
    
    // Add transaction to history
    addTransaction({
      type: 'submit_project',
      userId: creator,
      projectName: name,
      status: 'success'
    });
    
    res.json({
      success: true,
      data: newProject,
      message: `Project ${name} submitted successfully for review`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to submit project',
      message: error.message
    });
  }
});

// Get launchpad statistics
router.get('/stats', (req, res) => {
  try {
    const projects = getLaunchpadProjects();
    
    const stats = {
      totalProjects: projects.length,
      totalRaised: projects.reduce((sum, project) => sum + project.raised, 0),
      totalParticipants: projects.reduce((sum, project) => sum + project.participants, 0),
      projectsByStatus: {
        'Live': projects.filter(p => p.status === 'Live').length,
        'Upcoming': projects.filter(p => p.status === 'Upcoming').length,
        'Completed': projects.filter(p => p.status === 'Completed').length,
        'Pending Review': projects.filter(p => p.status === 'Pending Review').length
      },
      projectsByType: {
        'Gaming': projects.filter(p => p.type === 'Gaming').length,
        'DeFi': projects.filter(p => p.type === 'DeFi').length,
        'NFT': projects.filter(p => p.type === 'NFT').length,
        'Other': projects.filter(p => !['Gaming', 'DeFi', 'NFT'].includes(p.type)).length
      },
      topProjects: projects
        .sort((a, b) => b.raised - a.raised)
        .slice(0, 5)
        .map(project => ({
          name: project.name,
          raised: project.raised,
          target: project.target,
          participants: project.participants,
          progress: project.progress
        })),
      averageTarget: projects.reduce((sum, project) => sum + project.target, 0) / projects.length,
      successRate: (projects.filter(p => p.status === 'Completed' && p.progress >= 100).length / projects.filter(p => p.status === 'Completed').length) * 100
    };
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch launchpad stats',
      message: error.message
    });
  }
});

// Get user's launchpad participation history
router.get('/user/:userId/participation', (req, res) => {
  try {
    // Mock user participation history
    const participationHistory = [
      {
        projectId: 'project_001',
        projectName: 'AstroQuest',
        amount: 5000,
        tokensReceived: 100000,
        participationDate: '2024-04-15',
        status: 'confirmed',
        currentValue: 7500,
        roi: 50
      },
      {
        projectId: 'project_003',
        projectName: 'PixelRealm',
        amount: 10000,
        tokensReceived: 333333,
        participationDate: '2024-03-01',
        status: 'confirmed',
        currentValue: 15000,
        roi: 50
      }
    ];
    
    res.json({
      success: true,
      data: participationHistory,
      count: participationHistory.length,
      totalInvested: participationHistory.reduce((sum, p) => sum + p.amount, 0),
      totalValue: participationHistory.reduce((sum, p) => sum + p.currentValue, 0),
      averageRoi: participationHistory.reduce((sum, p) => sum + p.roi, 0) / participationHistory.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch participation history',
      message: error.message
    });
  }
});

// Get upcoming projects
router.get('/upcoming', (req, res) => {
  try {
    const projects = getLaunchpadProjects().filter(project => project.status === 'Upcoming');
    
    // Sort by launch date
    projects.sort((a, b) => new Date(a.launchDate) - new Date(b.launchDate));
    
    res.json({
      success: true,
      data: projects,
      count: projects.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming projects',
      message: error.message
    });
  }
});

// Get live projects
router.get('/live', (req, res) => {
  try {
    const projects = getLaunchpadProjects().filter(project => project.status === 'Live');
    
    // Sort by progress (descending)
    projects.sort((a, b) => b.progress - a.progress);
    
    res.json({
      success: true,
      data: projects,
      count: projects.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch live projects',
      message: error.message
    });
  }
});

module.exports = router; 