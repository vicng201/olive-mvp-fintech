# Olive – Unified Personal Financial Management & Loyalty Platform, Vietnam Market

Olive is a modern MVP web application built to streamline personal finance, loyalty points, and voucher redemption for Vietnamese users. It supports multi-bank account integration, loyalty point earning and tracking, voucher marketplaces, and cash-out features.

## 📦 Project info
This project was made with [Lovable](https://lovable.dev), a platform for building and deploying web applications with minimal coding.

**🔗 DEMO URL**: [https://lovable.dev/projects/0cf81d0d-8ccc-4abe-ab2a-5c038e991d74](https://olive-mvp-fintech.lovable.app/)

## 🚀 Main Features

**Core Features:**
- 🔐 Multi-wallet support (mock integration with Vietnamese banks)
- 💳 Scan and store loyalty cards (e.g., Circle K, 7-Eleven)
- 💰 Olive Points (1 point = 10 VND)
- 🎟️ Voucher marketplace for redemption
- 🔁 Cash out points via mock bank transfer
- 📈 Financial analytics and transaction tracking
- 📷 QR code scanner for point earning

**Specialized Features:**
- 🏦 Multi-bank integration (top 10 Vietnamese banks)
- 🇻🇳 Vietnamese market focus (VND, local merchants)
- ⏱️ Real-time balance tracking
- 🎮 Gamified point earning via merchant partnerships

## 🛠️ Getting started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/olive-mvp-fintech.git
   cd olive-mvp-fintech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   - Visit [http://localhost:8080](http://localhost:8080) in your browser.

> 🧑‍💻 The backend is mocked for MVP purposes. All data and API responses are simulated via [`src/lib/mockBackend.ts`](src/lib/mockBackend.ts).

For deployment, see the [Deployment](#deployment) section.

## 🏗️ Architecture
This project is frontend-focused, with the backend and database functionality simulated using a mock implementation. The mock backend is defined in [src/lib/mockBackend.ts](src/lib/mockBackend.ts), providing placeholder data and simulating API responses to support the application's features for the MVP.
### 📁 Project structure:
```
olive-mvp-fintech/
├── public/                # Static assets (favicon, robots.txt, etc)
├── src/
│   ├── App.tsx            # Main app component and router
│   ├── main.tsx           # App entry point
│   ├── index.css          # Global styles and Tailwind config
│   ├── App.css            # App-specific styles
│   ├── components/
│   │   └── ui/            # Reusable UI components (card, button, chart, etc)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and mock backend
│   └── pages/             # Main app pages (Index, WalletDetail, Vouchers, CashOut, etc)
├── package.json           # Project metadata and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project documentation
```
### 📄 Pages Details

The `src/pages/` directory contains the main application pages, each serving a specific purpose:

- **`Index.tsx`**  🏠
  The main dashboard displaying:  
  - 🪙 Summary of Olive points  
  - 📃 Recent transactions  
  - 👛 Wallet overview  
  - 🗂️ Navigation tabs  

- **`WalletDetail.tsx`**  👛
  Detailed view for a selected bank wallet, including:  
  - 📃 Transaction history  
  - 💵 Balance information  
  - 🔁 Cash-out options  

- **`VoucherMerchants.tsx`**  🏪
  A list of merchants where users can redeem points for vouchers.  

- **`VoucherOffers.tsx`**  🎁
  Displays voucher offers from a selected merchant, with actions for redemption.  

- **`CashOut.tsx`**  💸
  Allows users to convert Olive points to VND and transfer them to a linked bank account.  

- **`NotFound.tsx`**  🚫
  A 404 error page displayed for invalid routes.  

### 🧑‍💻 Project technologies:
- ⚡ Vite: Fast build tool for frontend development
- 🟦 TypeScript: Enhanced JavaScript with static typing
- ⚛️ React: UI library for building user interfaces
- 🧩 shadcn-ui: UI components
- 🎨 Tailwind CSS: Utility-first CSS framework

## 🚢 Deployment

Current Deployment Strategy:
- *Lovable Platform* - Automated deployment through Lovable's infrastructure
- *Staging URL*: https://lovable.dev/projects/0cf81d0d-8ccc-4abe-ab2a-5c038e991d74
- *Production Deployment*: One-click publish through Lovable interface

  
## 📚 Keywords

Finance, Technology, Web App, Mobile App, Rewards, Payments, Points System, Banking, User Experience, Digital Wallet, Personal Finance App, Loyalty Program, Financial App, Web Development, Software Project, Startup MVP, Modern UI, Cloud Deployment, Financial Innovation, App Prototype, Customer Engagement, FinTech Startup, MVP Demo, Tech for Good, Emerging Markets, Digital Innovation

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

© 2025 Olive Fintech. All rights reserved.


