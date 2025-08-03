# ClubConnect - Sherubtse College

A modern volunteer management platform for Sherubtse College students to connect with clubs, discover volunteer opportunities, and make a difference in their community.

## 🌟 Features

- **User Authentication** - Secure login/registration with email verification
- **Role-Based Access** - Admin and Member dashboards with different privileges
- **Club Management** - 10+ clubs including Rovers, Tarayana, YVIA, and more
- **Campaign Creation** - Admins can create and manage volunteer campaigns
- **Volunteer Registration** - One-click volunteer signup for campaigns
- **WhatsApp Integration** - Direct contact with club coordinators
- **Modern UI/UX** - Beautiful, responsive design with Sherubtse College branding
- **Real-time Statistics** - Track volunteer activities and impact

## 🏛️ Available Clubs

- **Rovers** - Youth development and leadership
- **Tarayana** - Community development and rural empowerment
- **YVIA** - Youth Volunteers in Action
- **Y-peers** - Youth peer education and health awareness
- **UNISCO** - United Nations International Student Conference Organization
- **Democracy** - Democratic values and civic engagement
- **Social Service** - Community service and social welfare
- **GNH** - Gross National Happiness club
- **Art Club** - Creative arts and cultural activities
- **Health Club** - Health awareness and wellness promotion

## 🚀 Quick Start

### Prerequisites
- Node.js (>= 18.0.0)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd clubconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open http://localhost:3000
   - Register as admin or member
   - Start exploring volunteer opportunities

## 📁 Project Structure

```
clubconnect/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── render.yaml           # Render deployment config
├── README.md             # Project documentation
├── controllers/          # Route controllers
│   ├── authController.js
│   ├── clubController.js
│   └── campaignController.js
├── models/              # Database models
│   ├── user.js
│   ├── club.js
│   ├── campaign.js
│   ├── volunteer.js
│   └── index.js
├── routes/              # Express routes
│   ├── authRoutes.js
│   ├── clubRoutes.js
│   └── campaignRoutes.js
├── views/               # EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── register-debug.ejs
│   ├── dashboard.ejs
│   └── member-dashboard.ejs
├── public/              # Static files
│   ├── config/
│   │   └── db.js
│   ├── css/
│   ├── js/
│   └── img/
└── services/            # Business logic
    └── emailService.js
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
DB_NAME=clubconnect
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432

# Session Configuration
SESSION_SECRET=your-secret-key

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Database Setup

The application uses SQLite by default for development. For production, you can configure PostgreSQL.

## 🎯 User Roles

### Admin (Club Coordinator)
- Create and manage campaigns
- View volunteer registrations
- Manage club information
- Full administrative access

### Member (Volunteer)
- Browse available campaigns
- Register as volunteer
- Contact club coordinators
- View personal volunteer history

## 🚀 Deployment

### Render Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy!

### Environment Variables for Render

Set these in your Render dashboard:

- `NODE_ENV=production`
- `DB_NAME=clubconnect`
- `DB_USER=postgres`
- `DB_HOST=your-render-postgres-host`
- `DB_PORT=5432`
- `DB_PASS=your-render-postgres-password`
- `SESSION_SECRET=your-secret-key`

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```

### Database Seeding
```bash
node seed.js
```

### Testing Database Connection
```bash
node test-connection.js
```

## 📱 Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Beautiful gradients and glass morphism effects
- **Real-time Updates** - Live statistics and volunteer tracking
- **Secure Authentication** - Email verification and session management
- **WhatsApp Integration** - Direct communication with coordinators
- **Role-based Access** - Different experiences for admins and members

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🏛️ About Sherubtse College

Sherubtse College is the premier institution of higher learning in Bhutan, located in Kanglung. ClubConnect serves as the official volunteer management platform for the college's diverse student clubs and community service initiatives.

## 📞 Support

For support or questions, please contact the development team or visit the college's IT department.

---

**Built with ❤️ for Sherubtse College** 