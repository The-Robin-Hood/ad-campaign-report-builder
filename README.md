# Ad Campaign Manager

[DEMO Link](https://ad-campaign-manager.vercel.app)

## Description

This project is a web application that showcases the sample ad manager dashboard reports with a drag-and-drop interface. It's built using Next.js and Tailwind CSS, with features like drag-and-drop metrics, visualization options, drill-down functionality, filtering capabilities, and data source integration.

## Features

- **Drag-and-Drop Metrics**: Users can drag and drop various ad campaign metrics onto the report canvas.
- **Visualization Options**: Multiple chart types available for visualizing chosen metrics.
- **Filtering Capabilities**: Implement filters for different campaign attributes.
- **Data Source Integration**: Connects with a mock ad tech API for campaign data metrics.

## Tech Stack

- **Frontend Framework**: Next.js
- **CSS Framework**: Tailwind CSS
- **Drag-and-Drop Library**: React DnD
- **Charting Library**: Chart.js
- **Data Fetching**: Axios
- **Authentication**: NextAuth.js
- **Database**: Prisma with MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or pnpm or yarn (personally I prefer bun)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/The-Robin-Hood/ad-campaign-report-builder.git
   ```

2. Navigate to the project directory:
   ```
   cd ad-campaign-report-builder
   ```

3. Install dependencies:
   ```
   bun install
   ```

4. Set up your environment variables in a `.env` file based on the `.env.example` file.

5. Run the development server:
   ```
   bun run  dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
.
├── app/
│   ├── api/
│   ├── (site)/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   └── custom/
├── hooks/
├── models/
├── prisma/
├── public/
└── utils/
```
