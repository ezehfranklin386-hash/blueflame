# Blue Flame Gas Supply LTD

A business website for **Blue Flame Gas Supply Limited**, an LPG gas supply and delivery company serving customers in Lagos, Nigeria.

The website provides information about the business, showcases its products and services, and gives customers a direct way to make enquiries and place orders.

## Features

- Responsive business website for desktop and mobile devices
- LPG product and service information
- Product catalogue and pricing presentation
- WhatsApp ordering and customer enquiry links
- Contact form
- Administrative functionality supported by Supabase
- Interactive UI and motion effects

## Technology Stack

- **HTML5** — page structure
- **React** — component-based user interface
- **Tailwind CSS** — styling and responsive layouts
- **Supabase** — backend services and data integration
- **Vite** — development server and production build
- **Framer Motion** — interface animations
- **Lucide React** — icons

## Getting Started

### Requirements

- Node.js and npm
- A Supabase project with the required environment variables

### Installation

~~~bash
git clone https://github.com/ezehfranklin386-hash/blueflame.git
cd blueflame
npm install
~~~

Create the environment configuration required by the application and add your Supabase project URL and public anon key. Do not commit private keys or secrets to the repository.

Start the development server:

~~~bash
npm run dev
~~~

Create a production build:

~~~bash
npm run build
~~~

For additional Supabase and deployment instructions, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md), [QUICKSTART.md](QUICKSTART.md), and [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## Project Structure

~~~text
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
~~~

## Business

**Blue Flame Gas Supply Limited**  
Lagos, Nigeria

This repository contains the website implementation. Business contact details and ordering options are presented through the website.
