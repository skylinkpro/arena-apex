const express = require('express');
const { getNftCollections, 
  getNftCollectionById, 
  getNfts, 
  getNftById,
  getLeaderboards,
  addTransaction 
 } = require('../data/mockData.js');

const router = express.Router();

// Get all NFT collections
router.get('/collections', (req, res) => {
  try {
    const collections = getNftCollections();
    res.json({
      success: true,
      data: collections,
      count: collections.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NFT collections',
      message: error.message
    });
  }
});

// Get collection by ID
router.get('/collections/:id', (req, res) => {
  try {
    const collection = getNftCollectionById(req.params.id);
    if (!collection) {
      return res.status(404).json({
        success: false,
        error: 'Collection not found'
      });
    }
    
    res.json({
      success: true,
      data: collection,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch collection',
      message: error.message
    });
  }
});

// Get NFTs in a collection
router.get('/collections/:id/nfts', (req, res) => {
  try {
    const collection = getNftCollectionById(req.params.id);
    if (!collection) {
      return res.status(404).json({
        success: false,
        error: 'Collection not found'
      });
    }
    
    const nfts = getNfts().filter(nft => nft.collection === collection.name);
    
    res.json({
      success: true,
      data: nfts,
      count: nfts.length,
      collection: collection.name,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NFTs',
      message: error.message
    });
  }
});

// Get all NFTs
router.get('/nfts', (req, res) => {
  try {
    const { collection, owner, priceMin, priceMax, rarity, sortBy = 'price', sortOrder = 'asc' } = req.query;
    
    let nfts = getNfts();
    
    // Filter by collection
    if (collection) {
      nfts = nfts.filter(nft => nft.collection === collection);
    }
    
    // Filter by owner
    if (owner) {
      nfts = nfts.filter(nft => nft.owner === owner);
    }
    
    // Filter by price range
    if (priceMin) {
      nfts = nfts.filter(nft => nft.price >= parseFloat(priceMin));
    }
    if (priceMax) {
      nfts = nfts.filter(nft => nft.price <= parseFloat(priceMax));
    }
    
    // Filter by rarity
    if (rarity) {
      nfts = nfts.filter(nft => nft.rarity === rarity);
    }
    
    // Sort NFTs
    nfts.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rarity':
          const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4 };
          aValue = rarityOrder[a.rarity] || 0;
          bValue = rarityOrder[b.rarity] || 0;
          break;
        case 'level':
          aValue = a.level || 0;
          bValue = b.level || 0;
          break;
        default:
          aValue = a.price;
          bValue = b.price;
      }
      
      if (sortOrder === 'desc') {
        return bValue - aValue;
      }
      return aValue - bValue;
    });
    
    res.json({
      success: true,
      data: nfts,
      count: nfts.length,
      filters: { collection, owner, priceMin, priceMax, rarity, sortBy, sortOrder },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NFTs',
      message: error.message
    });
  }
});

// Get NFT by ID
router.get('/nfts/:id', (req, res) => {
  try {
    const nft = getNftById(req.params.id);
    if (!nft) {
      return res.status(404).json({
        success: false,
        error: 'NFT not found'
      });
    }
    
    res.json({
      success: true,
      data: nft,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch NFT',
      message: error.message
    });
  }
});

// List NFT for sale
router.post('/nfts/:id/list', (req, res) => {
  try {
    const { price, seller, walletAddress, auctionEnd } = req.body;
    
    if (!price || !seller || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const nft = getNftById(req.params.id);
    if (!nft) {
      return res.status(404).json({
        success: false,
        error: 'NFT not found'
      });
    }
    
    if (nft.owner !== seller) {
      return res.status(403).json({
        success: false,
        error: 'Only the owner can list this NFT'
      });
    }
    
    // Mock listing
    const listing = {
      listingId: `listing_${Date.now()}`,
      nftId: nft.id,
      nftName: nft.name,
      collection: nft.collection,
      price,
      priceCurrency: nft.priceCurrency,
      seller,
      walletAddress,
      listTime: new Date().toISOString(),
      auctionEnd: auctionEnd || null,
      status: 'active',
      views: 0,
      likes: 0
    };
    
    // Add transaction to history
    addTransaction({
      type: 'list_nft',
      nftId: nft.id,
      userId: seller,
      price,
      status: 'success'
    });
    
    res.json({
      success: true,
      data: listing,
      message: `Successfully listed ${nft.name} for ${price} ${nft.priceCurrency}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to list NFT',
      message: error.message
    });
  }
});

// Buy NFT
router.post('/nfts/:id/buy', (req, res) => {
  try {
    const { buyer, walletAddress, price } = req.body;
    
    if (!buyer || !walletAddress || !price) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    const nft = getNftById(req.params.id);
    if (!nft) {
      return res.status(404).json({
        success: false,
        error: 'NFT not found'
      });
    }
    
    if (nft.owner === buyer) {
      return res.status(400).json({
        success: false,
        error: 'Cannot buy your own NFT'
      });
    }
    
    // Mock purchase
    const purchase = {
      transactionId: `tx_${Date.now()}`,
      nftId: nft.id,
      nftName: nft.name,
      collection: nft.collection,
      buyer,
      seller: nft.owner,
      price,
      priceCurrency: nft.priceCurrency,
      purchaseTime: new Date().toISOString(),
      status: 'completed',
      gasUsed: '0.008',
      gasPrice: '25',
      marketplaceFee: price * 0.025, // 2.5% fee
      creatorRoyalty: price * 0.075 // 7.5% royalty
    };
    
    // Add transaction to history
    addTransaction({
      type: 'buy_nft',
      nftId: nft.id,
      userId: buyer,
      amount: price,
      status: 'success'
    });
    
    res.json({
      success: true,
      data: purchase,
      message: `Successfully purchased ${nft.name} for ${price} ${nft.priceCurrency}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to purchase NFT',
      message: error.message
    });
  }
});

// Get NFT marketplace stats
router.get('/stats', (req, res) => {
  try {
    const collections = getNftCollections();
    const nfts = getNfts();
    
    const stats = {
      totalCollections: collections.length,
      totalNFTs: nfts.length,
      totalVolume: collections.reduce((sum, col) => sum + col.volume, 0),
      totalOwners: new Set(nfts.map(nft => nft.owner)).size,
      floorPrices: collections.map(col => ({
        collection: col.name,
        floorPrice: col.floorPrice,
        currency: col.floorPriceCurrency
      })),
      topCollections: collections
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 5)
        .map(col => ({
          name: col.name,
          volume: col.volume,
          items: col.items,
          owners: col.owners
        })),
      recentSales: [
        { nft: 'Legendary Sword #001', price: 12.5, currency: 'ETH', time: '2 hours ago' },
        { nft: 'Cyberpunk Avatar #456', price: 3.2, currency: 'ETH', time: '4 hours ago' },
        { nft: 'Racing Beast #789', price: 5.8, currency: 'ETH', time: '6 hours ago' }
      ]
    };
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch marketplace stats',
      message: error.message
    });
  }
});

// Get NFT leaderboard
router.get('/leaderboard', (req, res) => {
  try {
    const leaderboards = getLeaderboards();
    res.json({
      success: true,
      data: leaderboards.nft,
      count: leaderboards.nft.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard',
      message: error.message
    });
  }
});

// Create NFT collection
router.post('/collections', (req, res) => {
  try {
    const { 
      name, 
      description, 
      category, 
      blockchain, 
      creator, 
      walletAddress,
      royalty,
      traits 
    } = req.body;
    
    if (!name || !description || !category || !blockchain || !creator || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Mock collection creation
    const newCollection = {
      id: `collection_${Date.now()}`,
      name,
      description,
      category,
      blockchain,
      creator,
      walletAddress,
      royalty: royalty || 2.5,
      traits: traits || [],
      floorPrice: 0,
      volume: 0,
      items: 0,
      owners: 0,
      launchDate: new Date().toISOString(),
      verified: false
    };
    
    // Add transaction to history
    addTransaction({
      type: 'create_collection',
      userId: creator,
      collectionName: name,
      status: 'success'
    });
    
    res.json({
      success: true,
      data: newCollection,
      message: `Successfully created collection: ${name}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create collection',
      message: error.message
    });
  }
});

// Mint NFT
router.post('/mint', (req, res) => {
  try {
    const { 
      name, 
      description, 
      collection, 
      attributes, 
      creator, 
      walletAddress,
      image 
    } = req.body;
    
    if (!name || !description || !collection || !creator || !walletAddress) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Mock NFT minting
    const newNFT = {
      id: `nft_${Date.now()}`,
      name,
      description,
      collection,
      image: image || '🎨',
      price: 0,
      priceCurrency: 'ETH',
      seller: creator,
      owner: creator,
      rarity: 'Common',
      level: 1,
      attributes: attributes || {},
      blockchain: 'Ethereum',
      tokenId: Date.now().toString(),
      contractAddress: '0xNewNFT123',
      mintDate: new Date().toISOString(),
      lastSold: null,
      lastSoldPrice: null
    };
    
    // Add transaction to history
    addTransaction({
      type: 'mint_nft',
      userId: creator,
      nftName: name,
      collection,
      status: 'success'
    });
    
    res.json({
      success: true,
      data: newNFT,
      message: `Successfully minted NFT: ${name}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to mint NFT',
      message: error.message
    });
  }
});

module.exports = router; 