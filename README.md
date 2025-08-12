# PolyCypher - PCOS Assessment Platform

A comprehensive web application for PCOS (Polycystic Ovary Syndrome) assessment and tracking.

## Features

### 🔐 Authentication
- Secure user authentication using Kinde Auth
- User profile management
- Protected routes and API endpoints
- **Account deletion with data cleanup**

### 📊 PCOS Assessment
- Comprehensive PCOS assessment form with multiple symptoms and metrics
- Real-time score calculation based on weighted algorithms
- Auto-save functionality - data is saved as users make selections
- Assessment history tracking and visualization

### 💾 Database Integration
- PostgreSQL database with Prisma ORM
- User data persistence
- Assessment history storage
- Secure data handling
- **Cascade deletion for complete data cleanup**

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Dark/light theme support
- Interactive components with shadcn/ui
- Toast notifications for user feedback

## Database Schema

### User Model
- Basic user information (name, email, profile picture)
- Relationship to assessments and scores

### PcosAssessment Model
- Complete assessment data storage
- All form fields including:
  - PCOS diagnosis status
  - Follicle counts (left/right)
  - Symptoms (skin darkening, hair growth, weight gain, etc.)
  - Lab values (AMH, weight)
  - Calculated risk score
  - Timestamps

## API Endpoints

### `/api/user`
- `GET`: Retrieve current user information
- Creates user in database if not exists

### `/api/user/delete`
- `DELETE`: Delete user account and all associated data
- Requires confirmation parameter
- Cascade deletion removes all related records

### `/api/assessment`
- `POST`: Save new assessment data
- `GET`: Retrieve user's assessment history

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   DATABASE_URL="your-postgresql-connection-string"
   KIND_CLIENT_ID="your-kinde-client-id"
   KIND_CLIENT_SECRET="your-kinde-client-secret"
   KIND_ISSUER_URL="your-kinde-issuer-url"
   ```

3. **Set up database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## Assessment Features

### Auto-Save
- Form data is automatically saved as users make selections
- 2-second debounce to prevent excessive API calls
- Visual feedback during save operations

### Risk Scoring
- Weighted algorithm based on medical research
- Real-time score calculation
- Risk level categorization (Low/Medium/High)

### History Tracking
- Complete assessment history
- Detailed symptom tracking
- Risk level trends over time

## Account Management

### Account Deletion
- **Secure deletion process** with multiple confirmation steps
- **Complete data cleanup** - removes all user data including:
  - PCOS assessments
  - Health records and symptoms
  - Account settings and preferences
- **Cascade deletion** ensures no orphaned data remains
- **Audit logging** for security and compliance
- **Automatic logout** after successful deletion via Kinde Auth

### Security Features
- Authentication required for all sensitive operations
- Confirmation dialog with explicit user consent
- Type-to-confirm mechanism ("DELETE" text input)
- Server-side validation of deletion requests
- Proper Kinde Auth integration for Next.js App Router

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Kinde Auth
- **Deployment**: Vercel (recommended)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
