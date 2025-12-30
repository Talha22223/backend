# Frontend Installation & Setup Guide

## Step 1: Install Dependencies

Open PowerShell/Terminal and navigate to the frontend directory:

```powershell
cd d:\ecommerce-backend\frontend
npm install
```

This will install all required packages including:
- React & React Router
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- Zustand for state management
- And all other dependencies

## Step 2: Setup Environment Variables

The `.env` file has already been created with:
```env
VITE_API_URL=http://localhost:4000
```

Make sure your backend is running on port 4000.

## Step 3: Start Development Server

```powershell
npm run dev
```

The frontend will start on http://localhost:3000

## Step 4: Build for Production

```powershell
npm run build
```

This creates an optimized production build in the `dist` folder.

## Troubleshooting

### If you get TypeScript errors:
```powershell
npm install --save-dev @types/node
```

### If you get module not found errors:
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### If port 3000 is already in use:
Edit `vite.config.ts` and change the port number.

## Features Included

✅ **Authentication**: Login/Register pages with JWT
✅ **Product Browsing**: Product listing with search
✅ **Shopping Cart**: Add/remove items, update quantities
✅ **Product Details**: Detailed product view
✅ **Responsive Design**: Works on mobile and desktop
✅ **Dark Mode**: Automatic dark mode support
✅ **State Management**: Zustand for cart and auth
✅ **API Integration**: Connected to backend API

## Quick Test

After starting the dev server:

1. Visit http://localhost:3000
2. Click "Products" to browse
3. Click "Sign Up" to create an account
4. Add items to cart
5. View cart

## Docker Build

To build and run with Docker:

```powershell
cd d:\ecommerce-backend\frontend
docker build -t ecommerce-frontend .
docker run -p 80:80 ecommerce-frontend
```

Then visit http://localhost
