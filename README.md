# Rooming Management System

A modern React application built with Next.js for managing rooming lists and bookings for events. The application provides an intuitive interface to view, search, and filter rooming data grouped by events.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (check `.nvmrc` for recommended version)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd develative-code-challenge
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/rooming/       # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── RoomingCard.tsx   # Individual rooming list card
│   ├── SearchBar.tsx     # Search functionality
│   ├── StatusFilter.tsx  # Status filter dropdown
│   ├── SkeletonLoader.tsx # Loading skeleton
│   └── RoomingDivider.tsx # Event section divider
├── data/                 # Static data files
│   └── combined_rooming_data.json
├── hooks/                # Custom React hooks
│   └── useRoomingData.ts # Data fetching hook
├── lib/                  # Utility functions
│   ├── helpers.ts       # Date formatting helpers
│   └── utils.ts         # General utilities
├── providers/           # React context providers
│   └── QueryProvider.tsx # TanStack Query provider
├── stores/              # State management (future use)
└── types/               # TypeScript type definitions
    └── rooming.ts       # Rooming data types
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI primitives via shadcn/ui
- **Icons**: Lucide React

### Key Features

#### 📊 Data Display
- **Grouped by Events**: Rooming lists are organized by event names (e.g., "Rolling Loud", "Ultra Miami")
- **Card-based Layout**: Each rooming list is displayed as a card with key information
- **Responsive Design**: Grid layout that adapts to different screen sizes

#### 🔍 Search & Filter
- **Real-time Search**: Debounced search across RFP names and agreement types
- **Status Filtering**: Multi-select dropdown filter for rooming statuses
- **Skeleton Loading**: Visual feedback during search operations
- **Save-based Filtering**: Filters are applied only when user clicks "Save"

#### 🎨 UI Components
- **RoomingCard**: Displays individual rooming list information including:
  - RFP name and agreement type
  - Date range (calculated from bookings)
  - Cut-off date badge
  - Booking count button
- **SearchBar**: Input field with search icon and debounced functionality
- **StatusFilter**: Dropdown with checkboxes for status selection
- **SkeletonLoader**: Loading state placeholders

### Data Flow

1. **Data Fetching**: `useRoomingData` hook fetches rooming data from `/api/rooming`
2. **State Management**: React Query handles caching and loading states
3. **Filtering**: Client-side filtering and searching on the fetched data
4. **Grouping**: Data is grouped by event names for display
5. **Rendering**: Components render the filtered and grouped data

### API Structure

The application uses a simple REST API:

- **GET /api/rooming**: Returns all rooming list data
- Data is served from `src/data/combined_rooming_data.json`

### Type Definitions

All TypeScript interfaces are centralized in `src/types/rooming.ts`:

```typescript
interface Booking {
  bookingId: number;
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
}

interface RoomingList {
  roomingListId: number;
  eventId: number;
  eventName: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
  status: string;
  agreement_type: string;
  bookings: Booking[];
}
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Tailwind CSS**: Utility-first CSS framework
- **Component Architecture**: Modular, reusable components

### Styling

The application uses a custom design system built on Tailwind CSS with:
- Custom color variables defined in `globals.css`
- shadcn/ui component library for consistent UI
- Responsive design patterns
- Dark mode support (variables defined but not implemented)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for all new code
3. Add proper type definitions for new features
4. Test your changes thoroughly
5. Follow the component separation principles

## 📄 License

This project is private and proprietary.
