function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  console.log('Decision Logic::scoreAd >>', 'Bid:', bid, 'for auction:', auctionConfig.auctionSignals.auction, 'and size:', auctionConfig.auctionSignals.size);

  return bid;
}

function reportResult(auctionConfig, browserSignals, directFromSellerSignals) {
  console.log('Decision Logic::reportResult >>', 'Auction completed:', auctionConfig.auctionSignals.auction, auctionConfig.auctionSignals.size);

  const params = { 
    auction: auctionConfig.auctionSignals.auction,
    size: auctionConfig.auctionSignals.size,
  };

  sendReportTo(createLogURL('auction-result', params));
  registerAdBeacon({
    click: createLogURL('click', params),
    impression: createLogURL('impression', params),
  });
}

function createLogURL(event, params) {
  const baseUrl = 'https://localhost:3000/logger';
  const queryString = Object.entries({ ...params, event })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}?${queryString}`;
}