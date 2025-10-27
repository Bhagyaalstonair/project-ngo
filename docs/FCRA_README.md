# FCRA Compliance Suite

## Overview
The FCRA Compliance Suite provides comprehensive tools for managing Foreign Contribution Regulation Act (FCRA) compliance requirements for NGOs in India.

## Features
- Foreign donation tracking with currency conversion
- FIRC (Foreign Inward Remittance Certificate) management
- Registration status monitoring
- Statutory report exports (CSV/PDF)
- Role-based access controls
- Dashboard widgets for foreign funds overview

## Configuration

### Environment Variables
```env
# Backend API endpoints (optional - falls back to localStorage)
VITE_API_BASE_URL=http://localhost:8000/api

# S3 Configuration for file uploads (optional)
VITE_S3_BUCKET=your-bucket-name
VITE_S3_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your-access-key
VITE_AWS_SECRET_ACCESS_KEY=your-secret-key
```

### FCRA Registration Settings
Update the registration details in `src/pages/Compliance/FcraCompliancePage.tsx`:
```typescript
const fcraRegistration: FcraRegistration = {
  registrationNumber: 'FCRA/2023/NGO/12345', // Your FCRA registration number
  expiryDate: '2028-03-15', // Registration expiry date
  status: 'active'
};
```

## API Endpoints

### Required Backend Endpoints
If you have a backend server, implement these endpoints:

```
GET    /api/donations/          - List all donations
POST   /api/donations/          - Create new donation
PUT    /api/donations/:id/      - Update donation
DELETE /api/donations/:id/      - Delete donation
```

## Role-Based Access

### Permissions
- **Admin**: Full access to all FCRA features
- **Finance**: Can edit FIRC fields and view all data
- **Executive**: View-only access to reports
- **Employee**: No access to FCRA module

## Data Storage

### LocalStorage Fallback
When backend APIs are unavailable, data is stored in localStorage:
- Key: `fcra_donations`
- Format: JSON array of donation objects

## Testing

Run the included tests:
```bash
npm test src/utils/__tests__/fcraHelpers.test.ts
```