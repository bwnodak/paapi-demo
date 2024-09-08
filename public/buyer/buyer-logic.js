function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
  // Force a bid of 0 if the auction wants a particular size.
  const bid = (auctionSignals.size === interestGroup.ads[0].metadata.ad) ? Math.random() * 100 : 0;

  console.log('Buyer Logic::generateBid >>', auctionSignals.size, interestGroup.ads[0].metadata.ad);

  console.log('Buyer Logic::generateBid >>', 'Bid:', bid, 'for auction:', auctionSignals.auction, 'and size:', auctionSignals.size);

  return {
    bid: bid,
    render: interestGroup.ads[0].renderURL,
    ad: interestGroup.ads[0].metadata, 
  };
}

function reportWin(auctionSignals, perBuyerSignals, sellerSignals, browserSignals) {
  console.log('Buyer Logic::reportWin >>', 'Auction won:', auctionSignals.auction, 'for size:', auctionSignals.size);

  const params = {
    auction: auctionSignals.auction,
    size: auctionSignals.size,
    source: 'buyer',
  };

  registerAdBeacon({
    click: createLogURL('click', params),
    impression: createLogURL('impression', params),
  });
  sendReportTo(createLogURL('win', params));
}

function createLogURL(event, params) {
  const baseUrl = 'https://localhost:3000/logger';
  const queryString = Object.entries({ ...params, event })
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return `${baseUrl}?${queryString}`;
}
