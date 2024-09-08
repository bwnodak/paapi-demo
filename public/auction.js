// Function to join an ad interest group for different ad sizes
async function joinAdInterestGroup(size) {
  try {
    const ads = [
      { renderURL: `https://localhost:3000/ads/ad-728x90.html`, metadata: { ad: '728x90' } },
      { renderURL: `https://localhost:3000/ads/ad-300x250.html`, metadata: { ad: '300x250' } }
    ];

    await navigator.joinAdInterestGroup({
      owner: 'https://localhost:3000',
      name: `example-interest-group_${size}`,
      biddingLogicUrl: 'https://localhost:3000/buyer/buyer-logic.js',
      userBiddingSignals: { key: size },
      ads: size === '728x90' ? [ads[0]] : [ads[1]],
    }, 30);

    console.log(`Successfully joined the interest group for size ${size}`);
  } catch (error) {
    console.error(`Error joining ad interest group for size ${size}:`, error);
  }
}

// Function to run an ad auction for a given ad size
async function runAdAuction(size, containerId) {
  console.log(`Running ad auction for`);

  try {
    const auctionConfig = {
      seller: 'https://localhost:3000',
      decisionLogicURL: 'https://localhost:3000/seller/decision-logic.js',
      interestGroupBuyers: ['https://localhost:3000'],
      auctionSignals: { auction: 'example', size },
      sellerSignals: { seller: `example_seller_${size}` },
      perBuyerSignals: { 'https://localhost:3000': { buyer: `example_buyer_${size}` } },
      resolveToConfig: true,
    };

    const result = await navigator.runAdAuction(auctionConfig);
    console.log(`Auction result for ${size}:`, result);

    // Display the ad result in the appropriate container
    if (result && window.FencedFrameConfig && result instanceof FencedFrameConfig) {
      const frame = document.createElement('fencedframe');
      frame.config = result;
      frame.width = size === '728x90' ? 728 : 300;
      frame.height = size === '728x90' ? 90 : 250;

      document.getElementById(containerId).replaceChildren(frame);
    } else {
      if (result && !window.FencedFrameConfig) {
        console.error('FencedFrameConfig not found in the global scope');
      }
      document.getElementById(containerId).textContent = `No ad won the auction for ${size}`;
    }
  } catch (error) {
    console.error(`Error running ad auction for size ${size}:`, error);
  }
}

(async function start () {
  await joinAdInterestGroup('728x90');
  await joinAdInterestGroup('300x250');

  await runAdAuction('728x90', 'ad-container-728x90');
  await runAdAuction('300x250', 'ad-container-300x250');
})()
  .then(() => {
    console.log('Ad auction completed');
  })
  .catch((error) => {
    console.error('Ad auction failed:', error);
  });
