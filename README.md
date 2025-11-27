# Mini E-Commerce Frontend

A modern e-commerce frontend application built with Next.js 16, React 19, and TypeScript. Features a responsive design, product search, shopping cart, and order management.

## Features

- **Product Browsing**: Browse and view all available products
- **Product Search**: Search for products with real-time results
- **Product Details**: View detailed product information with images, ratings, and reviews
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout**: Complete purchases with integrated payment system
- **Order Management**: View order history and order details
- **User Authentication**: Secure login and registration
- **Responsive Design**: Mobile-first design that works on all devices

## Tech Stack

- **Framework**: Next.js 16 (with Turbopack)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Payment**: Stripe integration
- **HTTP Client**: Custom API client with token-based auth
- **Package Manager**: Bun

## Prerequisites

Before you begin, ensure you have the following installed:

- **Bun**: v1.0 or higher ([Install Bun](https://bun.sh))
- **Node.js**: v20 or higher (for compatibility)
- **Backend API**: The backend API server running on `http://localhost:5000`

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mehulrana017/ecommerce-fe.git
   cd ecommerce-fe
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:

   Copy the sample environment file:
   ```bash
   cp .env.sample .env.local
   ```

   Then edit `.env.local` with your configuration:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   ```

## Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

1. **Build the application**:
   ```bash
   bun run build
   ```

2. **Start the production server**:
   ```bash
   bun start
   ```

The production server will run on [http://localhost:3000](http://localhost:3000)

### Linting

Run ESLint to check code quality:

```bash
bun run lint
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Starts development server with Turbopack |
| `bun run build` | Creates optimized production build |
| `bun start` | Starts production server |
| `bun run lint` | Runs ESLint for code quality checks |

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (product listing)
│   ├── login/             # Login page
│   ├── signup/            # Registration page
│   ├── search/            # Search results page
│   ├── product/[id]/      # Product detail page
│   └── orders/            # Orders page
│
├── components/            # React components
│   ├── Navbar/           # Navigation bar with search
│   ├── ProductCard/      # Product card component
│   ├── ProductGrid/      # Product grid layout
│   ├── CheckoutSlider/   # Shopping cart slider
│   └── ui/               # Reusable UI components
│
├── hooks/                # Custom React hooks
│   ├── auth.ts          # Authentication hooks
│   ├── cart.ts          # Cart management hooks
│   ├── product.ts       # Product fetching hooks
│   └── order.ts         # Order management hooks
│
├── lib/                  # Utility libraries
│   ├── api/             # API client configuration
│   ├── types/           # TypeScript type definitions
│   └── utils.ts         # Helper functions
│
├── context/             # React Context providers
│   └── AppContext.tsx   # Global app state
│
└── public/              # Static assets
```

## Usage Guide

### For Users

1. **Browse Products**:
   - Visit the home page to see all available products
   - Products are displayed in a responsive grid layout

2. **Search Products**:
   - Use the search bar in the navbar
   - Type your query and press Enter
   - View filtered results on the search page

3. **View Product Details**:
   - Click on any product card to view full details
   - See product images, description, price, and ratings
   - Add products to cart with desired quantity

4. **Shopping Cart**:
   - Click the cart icon in the navbar to view your cart
   - Badge shows total item count
   - Update quantities or remove items
   - Proceed to checkout

5. **Authentication**:
   - Click "Login" or "Sign up" in the navbar
   - Create an account or log in to existing account
   - Authenticated users can access cart and orders

6. **Orders**:
   - Click the "Orders" button in navbar (when logged in)
   - View your order history
   - Check order status and details

7. **Logout**:
   - Click the "Logout" button in the navbar
   - You'll be redirected to the login page

### For Developers

#### API Integration

The app uses a custom API client located in `lib/api/client.ts`:

```typescript
// Example: Fetching products
import { useGetProducts } from '@/hooks/product';

function MyComponent() {
  const [refetch, { data, isPending, error }] = useGetProducts();
  // Use the data...
}
```

#### Adding New Components

1. Create component in appropriate directory under `components/`
2. Use TypeScript for type safety
3. Follow the existing component patterns
4. Use Tailwind CSS for styling

#### State Management

- **Global State**: AppContext for user, cart, and products
- **Server State**: React Query for API data
- **Form State**: React Hook Form for forms

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` | Yes |

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Kill the process using port 3000
kill -9 $(lsof -ti:3000)

# Or run on a different port
PORT=3001 bun dev
```

### API Connection Issues

1. Ensure the backend API is running on `http://localhost:5000`
2. Check `.env.local` has the correct `NEXT_PUBLIC_API_URL`
3. Verify CORS is enabled on the backend
4. Check network requests in browser DevTools

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear Bun cache
bun pm cache rm

# Reinstall dependencies
rm -rf node_modules bun.lockb
bun install

# Rebuild
bun run build
```

### Image Loading Issues

If product images aren't loading, ensure the image hostnames are configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-domain.com',
    },
  ],
}
```

### Bun-Specific Issues

If you encounter Bun-specific issues:

```bash
# Check Bun version
bun --version

# Upgrade Bun to latest version
bun upgrade

# Use Node.js as fallback
npm install
npm run dev
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Turbopack**: Ultra-fast build times and hot reload
- **Bun**: Lightning-fast package installation and runtime
- **React Query**: Automatic caching and background refetching
- **Next.js Image**: Optimized image loading
- **Code Splitting**: Automatic route-based code splitting
- **Suspense Boundaries**: Smooth loading states

## Key Features

### Navbar
- Search bar with real-time product search
- Cart icon with item count badge
- Orders button (authenticated users)
- Logout button (authenticated users)
- Login/Signup buttons (guest users)

### Product Search
- Isolated search state (doesn't affect home page)
- Empty query handling
- Loading states
- No results message
- Responsive grid layout

### Shopping Cart
- Slide-out cart panel
- Real-time quantity updates
- Item removal
- Total price calculation
- Cart badge showing item count

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Repository

GitHub: [https://github.com/mehulrana017/ecommerce-fe](https://github.com/mehulrana017/ecommerce-fe)

## License

This project is private and proprietary.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, React, and Bun
