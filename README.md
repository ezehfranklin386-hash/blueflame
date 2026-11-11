# Blue Flame Gas Supply LTD

A responsive business website for **Blue Flame Gas Supply Limited**, an LPG gas supply and delivery business in Lagos, Nigeria.

The website presents the business, its products and services, and ways for customers to make enquiries and place orders.

## Features

- Responsive layout for desktop and mobile
- LPG products and service information
- Product catalogue and pricing presentation
- WhatsApp ordering and customer enquiry links
- Contact form
- Supabase-backed administrative functionality
- Interactive interface and motion effects

## Technology Stack

- **React** — user interface
- **HTML5** — page structure
- **Tailwind CSS** — styling and responsive layouts
- **Supabase** — backend services and data integration
- **Vite** — development server and production build
- **Framer Motion** — animations
- **Lucide React** — icons

## Getting Started

### Requirements

- Node.js and npm
- A Supabase project and the configuration required by the application

### Installation

```bash
git clone https://github.com/ezehfranklin386-hash/blueflame.git
cd blueflame
npm install
```

Configure the Supabase project URL and public anon key using the environment configuration expected by the application. Do not commit private keys or secrets.

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

For more detailed setup information, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md), [QUICKSTART.md](QUICKSTART.md), and [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## Project Structure

```text
blueflame/
├── public/             # Static assets
├── src/
│   ├── admin/          # Admin-related functionality
│   ├── components/     # Reusable UI components
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   ├── config.js       # Application configuration
│   └── supabase.js     # Supabase client
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Project Status

This is a personal development project and is still under development. It has not been deployed as a live website.

## Business Context

**Blue Flame Gas Supply Limited**  
Lagos, Nigeria

This repository contains the website implementation. Business contact and ordering options are provided through the website.
