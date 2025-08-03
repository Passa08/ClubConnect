# 🚀 Deploy ClubConnect to Render

This guide will help you deploy your ClubConnect application to Render.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **PostgreSQL Database** - We'll set this up on Render

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Ensure all files are committed**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify these files exist in your repository:**
   - ✅ `app.js`
   - ✅ `package.json`
   - ✅ `render.yaml`
   - ✅ `.gitignore`
   - ✅ `README.md`

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email address

### Step 3: Create PostgreSQL Database

1. **In Render Dashboard:**
   - Click "New +"
   - Select "PostgreSQL"
   - Choose a name: `clubconnect-db`
   - Select your preferred region
   - Click "Create Database"

2. **Note the database credentials:**
   - Database URL
   - Username
   - Password
   - Host
   - Port

### Step 4: Deploy Web Service

1. **In Render Dashboard:**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Choose the repository containing ClubConnect

2. **Configure the service:**
   - **Name**: `clubconnect`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or choose paid for better performance)

### Step 5: Set Environment Variables

In your Render Web Service dashboard, go to "Environment" and add these variables:

```env
NODE_ENV=production
DB_NAME=clubconnect
DB_USER=your_postgres_username
DB_PASS=your_postgres_password
DB_HOST=your_postgres_host
DB_PORT=5432
SESSION_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Important:** Replace the values with your actual PostgreSQL credentials from Step 3.

### Step 6: Deploy and Test

1. **Click "Create Web Service"**
2. **Wait for deployment** (usually 2-5 minutes)
3. **Check the logs** for any errors
4. **Visit your deployed URL** (e.g., `https://clubconnect.onrender.com`)

### Step 7: Initialize Database

1. **Access your deployed application**
2. **Register as admin** or use the default admin account:
   - Email: `admin@clubconnect.com`
   - Password: `admin123`

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database Connection Error**
   - Verify PostgreSQL credentials in environment variables
   - Check that database is created and accessible

3. **Application Crashes**
   - Check Render logs for error messages
   - Verify all environment variables are set

### Debug Commands:

```bash
# Check if your app runs locally
npm start

# Test database connection
node test-connection.js

# Seed database locally
npm run seed
```

## 📊 Monitoring

1. **View Logs**: In Render dashboard → Your service → Logs
2. **Monitor Performance**: Check the "Metrics" tab
3. **Set up Alerts**: Configure notifications for downtime

## 🔄 Continuous Deployment

Render automatically deploys when you push to your main branch. To update:

```bash
git add .
git commit -m "Update application"
git push origin main
```

## 🌐 Custom Domain (Optional)

1. **In Render Dashboard:**
   - Go to your web service
   - Click "Settings"
   - Scroll to "Custom Domains"
   - Add your domain

2. **Configure DNS:**
   - Point your domain to Render's servers
   - Wait for DNS propagation

## 📱 Post-Deployment Checklist

- ✅ Application loads without errors
- ✅ Database connection works
- ✅ User registration/login functions
- ✅ Admin can create campaigns
- ✅ Members can volunteer
- ✅ WhatsApp links work
- ✅ All pages are responsive

## 🆘 Support

If you encounter issues:

1. **Check Render Logs** for error messages
2. **Verify Environment Variables** are correctly set
3. **Test Locally** to ensure code works
4. **Contact Render Support** for platform issues

---

**🎉 Congratulations! Your ClubConnect application is now live on Render!** 