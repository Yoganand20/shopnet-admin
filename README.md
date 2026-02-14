# E-Commerce Admin Dashboard

A modern, responsive, and fully functional Admin Panel built to manage the day-to-day operations of an e-commerce platform. This dashboard allows administrators to manage products, users, orders, and categories with a seamless UI powered by Shadcn UI and Tailwind CSS.

## Key Features

* **Dashboard Overview**: Visual statistics for total sales, active users, and recent orders.
* **Product Management**: Create, Read, Update, and Delete (CRUD) products with image support.

* **Category Management**: Organize products into specific categories.

* **User Management**: View and manage registered customer details.

* **Order Management**: Track order status (Pending, Shipped, Delivered) and view order details.

* **State Management**: Global state handling using Redux Toolkit for efficient data flow.

* **Modern UI/UX**: Clean interface using Shadcn UI components and Tailwind CSS.

* **API Integration**: Centralized API calls using Axios.

## Tech Stack

* **Frontend Framework**: React.js

* **Build Tool**: Vite

* **Styling**: Tailwind CSS

* **UI Components**: Shadcn UI

* **State Management**: Redux Toolkit

* **HTTP Client**: Axios

* **Icons**: Lucide React

```bash
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable UI components (buttons, tables, cards)
│   ├── ui/          # Shadcn UI primitives
├── features/        # Redux slices (authSlice, productSlice, etc.)
├── hooks/           # Custom React hooks
├── layouts/         # Layout wrappers (Sidebar, Navbar)
├── pages/           # Page components (Dashboard, Products, Orders)
├── services/        # API configuration and Axios interceptors
├── utils/           # Helper functions and constants
├── App.jsx          # Main application component
└── main.jsx         # Entry point
```

## Getting Started
Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:

  * Node.js (v16 or higher)

  * npm or yarn

  * shopnet-api 

### Installation
1. Clone the repository
```bash
git clone https://github.com/[your-username]/[repo-name].git
cd [repo-name]
```
2. Install dependencies
```bash
npm install
# or
yarn install
```
3. Configure Environment Variable
Create a .env file in the root directory and add your API endpoint:
```code
VITE_API_BASE_URL=http://localhost:5000/api/v1
```
4. Start backend server
Clone and start backend server from [repo](https://github.com/Yoganand20/ShopNet-API)

5. Run the development server

```bash
npm run dev
```

6. Build for production

```bash
npm run build
```