# Protected Audience API (PAAPI) Ad Auction Demo

## Purpose
This project demonstrates a local implementation of the **Protected Audience API (PAAPI)** using Chrome. It simulates ad auctions where buyers bid for ad space. The key components include bidding logic, ad decision logic, and integration with the `navigator` APIs that manage ad auctions. This serves as a useful playground for experimenting with ad auctions and gaining a better understanding of the key players involved.

![Screenshot 2024-09-08 at 12 07 16 PM](https://github.com/user-attachments/assets/c697d9a4-89e9-4669-8716-4fadbedd9c83)

### Key Players:
1. **`buyer-logic.js`**: Generates bids based on interest group signals. Adjusts bids based on ad performance and trusted signals.
2. **`decision-logic.js`**: Executes the seller's decision logic to score bids and select the highest-scoring ad.
3. **`navigator.joinAdInterestGroup()`**: Adds buyers to an interest group, allowing them to participate in future auctions.
4. **`navigator.runAdAuction()`**: This API runs the auction process, taking bids from multiple buyers and selecting a winner.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/bwnodak/paapi-demo.git
cd paapi-demo
```

### 2. Install Dependencies

```bash
npm install
```

The repository will install a self-signed certificate to support HTTPS, which is required by the PAAPI. This will happen upon `npm install`, and will likely prompt you for your system password so it can add the cert to your System keychain as a trusted source (on MacOS). The new cert will appear in your keychain as `devcert`.

### 3. Chrome Configuration

You will need to configure Chrome to allow insecure localhost SSL certs and allow localhost to use Privacy Sandbox features without enrollment or attestation.

#### From `chrome://flags`
* Open Chrome and visit `chrome://flags`
* Enable `#allow-insecure-localhost`
* Enabled `#privacy-sandbox-enrollment-overrides` and add `https://localhost:3000` to the list of allowed sites

![Screenshot 2024-09-08 at 12 05 24 PM](https://github.com/user-attachments/assets/a4b69666-df79-45c6-a06a-e54d7a813e1e)


#### From CLI

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-insecure-localhost --privacy-sandbox-enrollment-overrides=https://localhost:3000
```

2. From `chrome://flags`
  * Open Chrome and navigate to `chrome://flags`
  * Enable **"Allow invalid certificates for resources loaded from localhost"**.

### 4. Start the Server
Run the following command to start the server:

```bash
node start
```

You can also use dev-mode, which will automatically restard the server when you make changes to it:

```bash
node run dev
```

Once the server is running, open Chrome and navigate to: `https://localhost:3000`.

## Key Endpoints
* `/logger`: Logs GET and POST requests to the console.

## Notes
* This demo is designed specifically for **Chrome**, with the Privacy Sandbox APIs enabled.
* The project uses HTTPS for compliance with PAAPI requirements.
* To modify auction behavior, adjust `buyer-logic.js` and `decision-logic.js`.
