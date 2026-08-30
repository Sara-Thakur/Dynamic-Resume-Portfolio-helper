# Walkthrough - MERN Dynamic Portfolio & ATS Resume Builder

We have built a production-ready, easy-to-deploy MERN application in a clean Light Mode theme featuring a multi-step builder, real-time ATS score scanner, split-screen preview, PDF export, and shareable public portfolio URLs.

---

## 🌟 Key Accomplishments

### 1. Global State & Multi-Step Navigation (Zero Data Loss)
- **State Provider**: Implemented [`PortfolioContext.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/context/PortfolioContext.jsx) managing state globally across all 7 steps (Personal, Skills, Experience, Projects, Education, ATS Matcher, Preview & Export).
- **Navigation Controls**: Back/Next controls and clickable step progress tabs in [`StepNavigation.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/components/StepNavigation.jsx).
- **Dynamic Input Rows**: Dynamic addition and removal of skills, work experience entries, projects, and education items.

### 2. Real-Time ATS Keyword Matcher
- **Engine**: Implemented [`atsMatcher.js`](file:///c:/Users/PC/Desktop/miniproj/client/src/utils/atsMatcher.js) which extracts technical keywords from job descriptions.
- **Visual Feedback**: [`AtsCheckerStep.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/components/steps/AtsCheckerStep.jsx) renders a circular match percentage meter, categorized matched keywords (green chips), missing domain terms (rose chips), and targeted improvement recommendations.

### 3. Live Split-Screen Preview & PDF Export
- **Split-Screen Layout**: [`BuilderPage.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/pages/BuilderPage.jsx) renders the form on the left and real-time preview on the right.
- **Templates**: [`LivePreview.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/components/LivePreview.jsx) supports *Modern Clean*, *Minimal ATS*, and *Executive* light theme layouts.
- **ATS PDF Generator**: [`ExportPDFButton.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/components/ExportPDFButton.jsx) integrates `html2pdf.js` with print page-break optimizations.

### 4. MongoDB API & Public Shareable Portfolio Route
- **Backend Server**: Built Express server in [`server/index.js`](file:///c:/Users/PC/Desktop/miniproj/server/index.js) with CORS, Dotenv, and Mongoose connection.
- **Mongoose Schema**: Defined schema in [`server/models/Portfolio.js`](file:///c:/Users/PC/Desktop/miniproj/server/models/Portfolio.js).
- **Endpoints**:
  - `GET /api/health`: Health status endpoint for Render/hosting check.
  - `POST /api/portfolios`: Saves portfolio data and generates unique slug.
  - `GET /api/portfolios/:slug`: Fetches portfolio for public view route `/portfolio/:slug`.
- **Public View**: [`PublicPortfolioPage.jsx`](file:///c:/Users/PC/Desktop/miniproj/client/src/pages/PublicPortfolioPage.jsx) provides a public developer portfolio view and ATS resume toggle.

---

## 📁 Repository Structure

```
miniproj/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── models/
│   │   └── Portfolio.js          # Mongoose Schema
│   ├── routes/
│   │   └── portfolioRoutes.js    # API endpoints (/api/portfolios, /api/health)
│   ├── .env                      # Server environment variables
│   ├── index.js                  # Express server main entry
│   └── package.json              # Backend dependencies
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StepNavigation.jsx
│   │   │   ├── LivePreview.jsx
│   │   │   ├── ExportPDFButton.jsx
│   │   │   └── steps/            # 7 Form Step Components
│   │   ├── context/
│   │   │   └── PortfolioContext.jsx # Global React Context
│   │   ├── pages/
│   │   │   ├── BuilderPage.jsx
│   │   │   └── PublicPortfolioPage.jsx
│   │   ├── utils/
│   │   │   └── atsMatcher.js     # ATS analysis algorithm
│   │   ├── App.jsx               # React Router setup
│   │   ├── index.css             # Tailwind CSS & Print styles
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json               # Vercel SPA routing rewrite rules
└── package.json                  # Root npm script runner
```

---

## 🚀 How to Run Locally & Deploy

### Running Backend API (Server)
```bash
cd server
npm install
npm run dev
# Server running at http://localhost:5000
```

### Running Frontend (Client)
```bash
cd client
npm install
npm run dev
# React App running at http://localhost:3000
```

### Deploying to Vercel & Render
- **Frontend (Vercel)**: Push `client/` folder or point Vercel to `client/`. The included [`vercel.json`](file:///c:/Users/PC/Desktop/miniproj/client/vercel.json) ensures SPA routes (`/portfolio/:slug`) reload seamlessly.
- **Backend (Render)**: Deploy `server/` to Render. Point `/api/health` as health check path. Set `MONGODB_URI` environment variable.
