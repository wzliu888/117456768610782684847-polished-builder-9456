# Vite + TanStack + React Template

A modern, performance-focused React template with TanStack Router, Tailwind CSS, and Biome for a smooth developer experience.

## 📋 Features

- **React 19** with TypeScript
- **Vite 6** for blazing fast development
- **TanStack Router** for type-safe file-based routing
- **Tailwind CSS 4** for utility-first styling
- **Biome** for linting and formatting
- **Vitest** for unit and component testing
- **Ready for extension** with TanStack Query and Store

## 🚀 Getting Started

### Installation

```bash
# Clone the repository (or use as a template)
git clone https://github.com/yourusername/vite-template.git my-app
cd my-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run start  # or npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app.

### Building For Production

```bash
# Build for production
npm run build

# Preview the production build
npm run serve
```

## 🧪 Testing & Quality

```bash
# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Run all checks
npm run check && npm test
```

## 📁 Project Structure

```
vite-template
├─ public/           # Static assets
├─ src/
│  ├─ routes/        # File-based routes
│  │  ├─ index.tsx   # Root route
│  │  └─ __root.tsx  # Shared layout & DevTools
│  ├─ components/    # Reusable UI components
│  ├─ lib/           # Utility functions
│  └─ styles.css     # Global styles with Tailwind
├─ AGENTS.md         # AI agent guidance
└─ README.md         # Project documentation
```

## 🧩 Key Features

### Routing with TanStack Router

This project uses file-based routing with TanStack Router. Each file in `src/routes/` becomes a route in your application.

#### Adding A New Route

1. Create a new file in `src/routes/`, for example `about.tsx`:

```tsx
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <div>About Page</div>,
});
```

2. Add a link to your new route in the navigation:

```tsx
// In src/routes/__root.tsx
<Link to="/about">About</Link>
```

### Data Fetching

You can fetch data using route loaders or TanStack Query.

#### Using Route Loaders

```tsx
// Example route with a loader
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json();
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

#### Using TanStack Query

First, install TanStack Query:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

Then set up the provider in your main.tsx:

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

// In your app render
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router} />
  {import.meta.env.DEV && <ReactQueryDevtools buttonPosition="top-right" />}
</QueryClientProvider>
```

### State Management with TanStack Store

For global state management, you can use TanStack Store:

```bash
npm install @tanstack/store
```

Basic usage example:

```tsx
import { useStore } from "@tanstack/react-store";
import { Store, Derived } from "@tanstack/store";

// Create a store
const countStore = new Store(0);

// Create derived state
const doubledStore = new Derived({
  fn: () => countStore.state * 2,
  deps: [countStore],
});
doubledStore.mount();

// Use in components
function Counter() {
  const count = useStore(countStore);
  const doubled = useStore(doubledStore);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubled}</p>
      <button onClick={() => countStore.setState(count + 1)}>Increment</button>
    </div>
  );
}
```

### UI Components with Shadcn

Add pre-styled components using Shadcn:

```bash
pnpx shadcn@latest add button
```

## 📦 Demo Files

Files prefixed with `demo` are example implementations that can be safely deleted.

## 📚 Learn More

- [TanStack Router Documentation](https://tanstack.com/router/latest/docs/framework/react/overview)
- [TanStack Store Documentation](https://tanstack.com/store/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Biome Documentation](https://biomejs.dev/guides/getting-started/)
- [Vitest Documentation](https://vitest.dev/guide/)
