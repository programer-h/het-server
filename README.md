# HET Server - Real-time Online Users Backend

This is the backend server for the HET wallet app that enables real-time online user tracking.

## Quick Deploy to Render.com (Free)

### Step 1: Upload to GitHub
1. Create a new repository on GitHub called `het-server`
2. Upload these files to your repository:
   - `server.js`
   - `package.json`
   - `README.md`

### Step 2: Deploy on Render
1. Go to [https://render.com/](https://render.com/) and sign up
2. Click **New +** > **Web Service**
3. Connect your GitHub and select the `het-server` repository
4. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Port**: (leave blank)
5. Click **Create Web Service**

### Step 3: Update Your Frontend
In your `home.html`, change:
```js
let socket = io('http://localhost:3000');
```
to:
```js
let socket = io('https://YOUR-RENDER-URL.onrender.com');
```

## Local Development
```bash
npm install
npm start
```

## Features
- Real-time online user tracking
- Automatic user disconnection detection
- User status updates
- CORS enabled for web clients

## API Endpoints
- WebSocket connection for real-time communication
- Events: `user-online`, `user-status-update`, `disconnect` 