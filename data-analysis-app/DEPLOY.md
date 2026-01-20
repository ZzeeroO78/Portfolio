# Render.com Build & Deploy Configuration

## Full-Stack Deployment (Single Service)

### Build Command
```bash
cd client && npm install && npm run build && cd ../server && npm install
```

### Start Command
```bash
cd server && npm start
```

### Environment Variables (Set in Render Dashboard)
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-production-secret-key-change-this
JWT_EXPIRE=7d
ADMIN_MASTER_KEY=your-production-admin-key-change-this
```

## Deployment Steps

### 1. Connect GitHub Repository
1. Go to https://render.com
2. Sign up / Log in
3. Click "New +" → "Web Service"
4. Connect your GitHub account
5. Select repository: `ZzeeroO78/Portfolio`

### 2. Configure Service
- **Name**: data-analysis-app
- **Region**: Frankfurt (EU) or closest to you
- **Branch**: main
- **Root Directory**: `data-analysis-app`
- **Runtime**: Node
- **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
- **Start Command**: `cd server && npm start`

### 3. Set Environment Variables
Add these in Render Dashboard → Environment:
- `NODE_ENV` = `production`
- `JWT_SECRET` = (generate a secure random string)
- `JWT_EXPIRE` = `7d`
- `ADMIN_MASTER_KEY` = (your secret admin password)

### 4. Deploy
Click "Create Web Service" and wait for deployment (~5-10 minutes)

## Your App URL
After deployment, your app will be available at:
`https://data-analysis-app.onrender.com`

## Notes
- Free tier may sleep after 15 min of inactivity (first request takes ~30s to wake up)
- SQLite database is ephemeral on Render free tier (data resets on redeploy)
- For persistent data, consider upgrading or using external database
