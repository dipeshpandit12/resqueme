# ResQMe Responder Dashboard

## Overview

The ResQMe Responder Dashboard is a web application built for the City of Austin's emergency response departments. This dashboard interfaces with the ResQMe App to provide emergency responders with critical information about individuals in need of emergency assistance.

The dashboard displays real-time emergency requests and provides responders with access to vital personal data including:

- Contact information of the person in distress
- Emergency contact details for family members
- Precise GPS location of the emergency
- Medical history and relevant health information
- Emergency type and severity classification
- Detailed description of the emergency situation

## Features

- **Interactive Map View**: Real-time visualization of emergency locations across Austin
- **Emergency Request List**: Organized listing of all active emergency requests
- **Detailed Emergency Information**: Complete profiles of each emergency situation
- **Authentication System**: Secure access limited to authorized emergency personnel
- **Mobile Access Restrictions**: Desktop-optimized interface for control center use

## Project Origin

ResQMe was developed during the RiverHacks hackathon 2025 in Austin. The project was created to address emergency response challenges faced by the City of Austin's first responders by providing a centralized dashboard for accessing critical information during emergencies.

## Screenshots

![image](https://github.com/user-attachments/assets/ce5566ba-a3fb-4c15-bd05-b68b3c16409b)


![image](https://github.com/user-attachments/assets/7705e760-d020-4671-80c6-6306e58318a7)




## Installation

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn package manager

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd resqueme
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following values:
   ```
   DATABASE_URL="[your-database-connection-string]"
   DASHBOARD_PASSWORD="[secure-password-for-responder-access]"
   PASSWORD_KEY="[key-for-local-storage-auth]"
   NEXT_PUBLIC_DASHBOARD_PASSWORD="[same-as-dashboard-password]"
   NEXT_PUBLIC_PASSWORD_KEY="[same-as-password-key]"
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Access the dashboard at `http://localhost:3000`

## Environment Variables

The following environment variables must be configured for the application to function properly:

| Variable | Description |
|----------|-------------|
| DATABASE_URL | Connection string for your database |
| DASHBOARD_PASSWORD | Secure password for accessing the responder dashboard |
| PASSWORD_KEY | Key used for storing authentication in local storage |
| NEXT_PUBLIC_DASHBOARD_PASSWORD | Client-side version of dashboard password |
| NEXT_PUBLIC_PASSWORD_KEY | Client-side version of password key |

## Usage

1. **Login**: Access the dashboard using the department-issued password
2. **View Emergencies**: Monitor the map for new emergency requests
3. **Review Details**: Click on any emergency to view complete information
4. **Respond**: Use the provided contact information and location data to coordinate emergency response

## Security Considerations

This application handles sensitive personal and medical information. Please ensure:

- Access is restricted to authorized emergency personnel only
- The dashboard is used on secure, department-issued devices
- Password credentials are never shared
- The application is deployed in a secure environment

## Technology Stack

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet, React-Leaflet
- **Authentication**: JWT, HTTP-only cookies, Password Protection
- **Deployment**: [Add deployment platform information]

## License

[Add appropriate license information]

## Contact

For technical support or questions about the ResQMe Dashboard, please contact:
[Add contact information]

---

*This dashboard is part of the City of Austin's emergency response infrastructure and is intended for official use only.*
*Developed during RiverHacks hackathon 2025, Austin*
