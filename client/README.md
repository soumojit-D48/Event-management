# Event Management System - Client

This is the frontend client for the Event Management System built with React, Vite, and Tailwind CSS. It provides a modern, responsive user interface for managing events, registrations, and dashboards.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=EventHub
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (output to `dist/`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check for code issues |

## 🏗️ Project Structure

```
client/
├── public/                  # Static public assets
├── src/
│   ├── assets/             # Images, fonts, and static files
│   │   └── images/         # Image assets
│   │
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication forms & components
│   │   │   ├── SignInForm.jsx
│   │   │   └── registrationForm.jsx
│   │   │
│   │   ├── dashboard/      # Dashboard-specific components
│   │   │   ├── UpcomingEvents.jsx
│   │   │   ├── StatsGrid.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   └── RecentActivity.jsx
│   │   │
│   │   ├── layout/         # Layout & navigation components
│   │   │   ├── Layout.jsx       # Main app layout
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── Sidebar.jsx      # Side navigation
│   │   │   ├── Footer.jsx       # Page footer
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicOnlyRoute.jsx
│   │   │   └── RoleBasedRoute.jsx
│   │   │
│   │   └── ui/             # Base UI components (Radix-based)
│   │       ├── button.jsx
│   │       ├── input.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── form.jsx
│   │       ├── select.jsx
│   │       ├── table.jsx
│   │       ├── tabs.jsx
│   │       ├── avatar.jsx
│   │       ├── badge.jsx
│   │       ├── label.jsx
│   │       ├── textarea.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── alert.jsx
│   │       └── LoadingSpinner.jsx
│   │
│   ├── pages/              # Page components (route destinations)
│   │   ├── Landing.jsx          # Landing page
│   │   ├── SignIn.jsx           # Sign in page
│   │   ├── SignUp.jsx           # Sign up page
│   │   ├── Dashboard.jsx        # User dashboard
│   │   ├── EventDetails.jsx     # Event details view
│   │   ├── CreateEvent.jsx      # Create new event
│   │   ├── UpdateEvent.jsx      # Update existing event
│   │   ├── MyRegistrations.jsx  # User's registrations
│   │   ├── EventDashboard.jsx   # Event-specific dashboard
│   │   ├── ManagingMyEvent.jsx  # Events user manages
│   │   ├── CreateApplication.jsx# Create event application
│   │   ├── ManageTeam.jsx       # Manage event team
│   │   ├── EventIManage.jsx     # Events being managed
│   │   ├── BudgetDashboard.jsx  # Budget overview
│   │   ├── BudgetOverview.jsx   # Budget details
│   │   ├── AttendanceMark.jsx   # Mark attendance
│   │   ├── AttendanceEvent.jsx  # Event attendance view
│   │   ├── AttendanceOverview.jsx
│   │   ├── AttendanceScanOverview.jsx
│   │   ├── RegistrationOverview.jsx
│   │   ├── GetEventRegistrations.jsx
│   │   ├── Feedback.jsx         # Submit feedback
│   │   ├── FeedbackOverview.jsx # View feedback
│   │   ├── CertificationTemplateUpload.jsx
│   │   ├── ParticipentCeritificatePage.jsx
│   │   ├── ManageUsers.jsx      # Admin user management
│   │   ├── ApproveRole.jsx      # Role approval
│   │   └── UnauthorizedPage.jsx # 403 page
│   │
│   ├── state/              # Redux state management
│   │   ├── store.js        # Redux store configuration
│   │   └── api/            # API slices & RTK Query
│   │       └── ...
│   │
│   ├── lib/                # Utilities and configurations
│   │   ├── utils.js        # Helper functions
│   │   └── schemas.js      # Zod validation schemas
│   │
│   ├── constants/          # Application constants
│   │   └── apiEndpoints.js # API endpoint constants
│   │
│   ├── App.jsx             # Root component with routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles (Tailwind)
│
├── index.html              # HTML template
├── package.json
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── .env                    # Environment variables
```

## 🎨 Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI |
| Forms | React Hook Form + Zod |
| HTTP Client | Redux Toolkit Query |
| Charts | Chart.js + react-chartjs-2 |
| Animations | Framer Motion |
| Icons | Lucide React |
| QR Code | html5-qrcode |
| Notifications | Sonner |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_APP_NAME` | Application name | `EventHub` |

### Vite Config

Key configuration options in `vite.config.js`:

- **Server**: Runs on port 5173 by default
- **Proxy**: API requests to backend are proxied
- **Plugins**: React, Tailwind CSS

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔐 Authentication

The client uses JWT-based authentication:
- Tokens are stored in cookies (httpOnly)
- Protected routes redirect to sign-in
- Role-based access control for admin features

## 🎯 Key Features

1. **Authentication**: Sign in/up with JWT tokens
2. **Event Browsing**: View all available events
3. **Event Management**: Create, edit, and delete events
4. **Registration**: Register for events with confirmation
5. **Dashboard**: Personalized user dashboard
6. **QR Codes**: Generate and scan for check-in
7. **Certificates**: Download event certificates
8. **Analytics**: View registration and attendance stats