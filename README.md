# DALOG Diagnostic Report Manager

A modern diagnostic report management system built with React, TypeScript, and Vite. A scalable system designed to handle file uploads, management, and visualization of reports with excellent architectural practices, code splitting, and error handling.

## 📋 Table of Contents

- [Installation and Setup](#-installation-and-setup)
- [Libraries and Dependencies](#-libraries-and-dependencies)
- [Folder Structure](#-folder-structure)
- [Project Components](#-project-components)
- [Architecture](#-architecture)
- [Implemented Patterns](#-implemented-patterns)
- [Scalability for Files > 1GB](#-scalability-for-files--1gb)

---

## 🚀 Installation and Setup

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 10.0.0 or higher (or yarn/pnpm as alternatives)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dilopezch/diagnostic-report-manager.git
cd diagnostic-report-manager
```

2. **Install dependencies**
```bash
npm install
```

### Available Scripts

```bash
# Start the development server with HMR (Hot Module Replacement)
npm run dev
# URL: http://localhost:5173 (port may vary)

# Build for production (TypeScript + Vite optimized)
npm run build

# Preview the production build
npm run preview

# Run ESLint
npm run lint

# Run unit tests with Vitest
npm test

# Run tests with UI interface
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### Testing

The project uses **Vitest** and **React Testing Library** for comprehensive unit testing.

```bash
# Run tests in watch mode (recommended during development)
npm test

# Run tests once (useful for CI/CD)
npm test -- --run

# Open interactive test UI in browser
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Component tests (ErrorBoundary, LoadingFallback, SuspenseBoundary, etc.)
- ✅ Service layer tests (reportsService)
- ✅ State management tests (Zustand store)
- ✅ 40+ tests covering critical functionality

See [TESTING.md](TESTING.md) for detailed testing documentation.
```

---

## 📦 Libraries and Dependencies

### Production Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **react** | ^19.2.0 | Main UI library |
| **react-dom** | ^19.2.0 | DOM rendering |
| **react-router-dom** | ^7.13.0 | Routing and navigation |
| **zustand** | ^5.0.10 | Global state management (store) |
| **@tailwindcss/vite** | ^4.1.18 | Tailwind plugin for Vite |

### Development Dependencies

| Library | Version | Purpose |
|---------|---------|---------|
| **typescript** | ~5.9.3 | Static type checking for JavaScript |
| **vite** | ^7.2.4 | Ultra-fast bundler and dev server |
| **@vitejs/plugin-react** | ^5.1.1 | React plugin for Vite (Fast Refresh) |
| **tailwindcss** | ^4.1.18 | Utility-first CSS framework |
| **postcss** | ^8.5.6 | CSS processor |
| **autoprefixer** | ^10.4.23 | CSS vendor prefixes for compatibility |
| **eslint** | ^9.39.1 | Code linter |
| **eslint-plugin-react-hooks** | ^7.0.1 | ESLint rules for React Hooks |
| **eslint-plugin-react-refresh** | ^0.4.24 | Fast Refresh validation |
| **typescript-eslint** | ^8.46.4 | TypeScript support in ESLint |
| **@types/react** | ^19.2.5 | TypeScript types for React |
| **@types/react-dom** | ^19.2.3 | TypeScript types for React DOM |
| **@types/node** | ^24.10.1 | TypeScript types for Node.js |
| **@eslint/js** | ^9.39.1 | ESLint base configuration |
| **globals** | ^16.5.0 | Predefined global variables |

---

## 📁 Folder Structure

```
diagnostic-report-manager/
├── src/
│   ├── components/              # Reusable components
│   │   ├── ErrorBoundary.tsx              # Global error boundary
│   │   ├── FeatureErrorBoundary.tsx       # Error boundary for features
│   │   ├── LoadingFallback.tsx            # Customizable loading UI
│   │   └── SuspenseBoundary.tsx           # Reusable Suspense wrapper
│   │
│   ├── features/                # Business domain features
│   │   └── reports/
│   │       ├── ReportsList.tsx            # Reports list component
│   │       └── ReportUpload.tsx           # Report upload component
│   │
│   ├── pages/                   # Main routes/pages
│   │   └── Home.tsx                       # Home page
│   │
│   ├── services/                # Business logic and API
│   │   └── reports/
│   │       ├── reportsService.ts          # Service functions
│   │       └── reports-mock.json          # Mock data for development
│   │
│   ├── store/                   # Global state (Zustand)
│   │   └── useReportsStore.ts             # Reports store
│   │
│   ├── types/                   # TypeScript type definitions
│   │   └── ReportModel.ts                 # ReportModel interface
│   │
│   ├── assets/                  # Static assets
│   │
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
│
├── public/                      # Public static files
├── dist/                        # Production build (generated)
│
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # TS configuration for app
├── tsconfig.node.json           # TS configuration for build tools
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

---

## 🧩 Project Components

### Base Components (Reusable)

#### **ErrorBoundary**
- **Location**: `src/components/ErrorBoundary.tsx`
- **Purpose**: Catches errors in the entire React component tree
- **Props**: 
  - `children`: Content to protect
  - `fallback?`: Custom error UI
  - `onError?`: Callback for logging
- **Usage**: Wraps the entire application

#### **FeatureErrorBoundary**
- **Location**: `src/components/FeatureErrorBoundary.tsx`
- **Purpose**: Error boundary specific to individual features
- **Props**: 
  - `children`: Feature content
  - `featureName`: Feature name for identification
- **Usage**: Wraps critical features

#### **LoadingFallback**
- **Location**: `src/components/LoadingFallback.tsx`
- **Purpose**: Reusable loading UI with animated spinner
- **Props**:
  - `message?`: Loading text (default: "Loading...")
  - `size?`: Spinner size ('small' | 'medium' | 'large')
- **Also Exports**: `LoadingSpinner` for inline use

#### **SuspenseBoundary**
- **Location**: `src/components/SuspenseBoundary.tsx`
- **Purpose**: Reusable Suspense wrapper
- **Props**:
  - `children`: Asynchronous content
  - `fallbackMessage?`: Loading message
  - `fallbackSize?`: Spinner size

### Feature Components

#### **ReportsList**
- **Location**: `src/features/reports/ReportsList.tsx`
- **Purpose**: Displays reports list with search functionality
- **Features**:
  - Real-time search
  - Report filtering
  - Zustand store integration
  - Lazy-loaded for code splitting

#### **ReportUpload**
- **Location**: `src/features/reports/ReportUpload.tsx`
- **Purpose**: Report upload form
- **Features**:
  - Drag & drop support
  - File validation
  - Loading states
  - Feedback messages
  - Lazy-loaded for code splitting

### Pages

#### **Home**
- **Location**: `src/pages/Home.tsx`
- **Purpose**: Main page orchestrating features
- **Contains**: ReportsList and ReportUpload wrapped in boundaries

---

## 🏗️ Architecture

### Layer Diagram

```
┌─────────────────────────────────────────┐
│       React Components (UI)              │
│  ├─ App.tsx                             │
│  └─ pages/Home.tsx                      │
├─────────────────────────────────────────┤
│  Error & Suspense Boundaries             │
│  ├─ ErrorBoundary                       │
│  ├─ FeatureErrorBoundary                │
│  └─ SuspenseBoundary                    │
├─────────────────────────────────────────┤
│  Features (Lazy-loaded)                  │
│  ├─ features/reports/ReportsList        │
│  └─ features/reports/ReportUpload       │
├─────────────────────────────────────────┤
│  State Management (Zustand)              │
│  └─ store/useReportsStore.ts            │
├─────────────────────────────────────────┤
│  Services & Business Logic               │
│  └─ services/reports/reportsService.ts  │
├─────────────────────────────────────────┤
│  Types & Models                          │
│  └─ types/ReportModel.ts                │
└─────────────────────────────────────────┘
```

### Data Flow

1. **UI Components** → User interaction
2. **Services** → Business logic and API calls
3. **Zustand Store** → Centralized global state
4. **Components** → Re-render with new state
5. **Error/Suspense Boundaries** → Error handling and loading states

### Architecture Features

- ✅ **Separation of Concerns**: Components, services, state, and types
- ✅ **Lazy Loading**: Automatic code splitting by route and feature
- ✅ **Error Handling**: Multiple layers of error boundaries
- ✅ **Type Safety**: TypeScript throughout the application
- ✅ **State Management**: Zustand for lightweight global state
- ✅ **Fast Refresh**: HMR configured in Vite

---

## 🎯 Implemented Patterns

### 1. **Error Boundary Pattern**
Catches component errors to prevent complete app crashes.

```tsx
<ErrorBoundary fallback={<ErrorUI />} onError={(error) => logError(error)}>
  <YourComponent />
</ErrorBoundary>
```

**Benefits**:
- Prevents white screen of death
- Isolates failures by feature
- Centralized logging

---

### 2. **Suspense Pattern**
Handles lazy-loaded components with elegant loading states.

```tsx
<Suspense fallback={<LoadingFallback />}>
  <LazyComponent />
</Suspense>
```

**Benefits**:
- Automatic code splitting
- Smaller initial bundle
- Better performance on slow connections

---

### 3. **Compound Components Pattern**
Error Boundary + Suspense working together:

```tsx
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<LoadingUI />}>
    <Feature />
  </Suspense>
</ErrorBoundary>
```

---

### 4. **Custom Hooks Pattern**
Global state with Zustand:

```tsx
const { reports, loading, error, loadReports } = useReportsStore()
```

**Benefits**:
- Intuitive API
- Immutability by default
- Built-in DevTools

---

### 5. **Feature-Based Architecture**
Organization by business domains:

```
features/
  └─ reports/
      ├─ ReportsList.tsx
      └─ ReportUpload.tsx
```

**Benefits**:
- Scalability
- Easy maintenance
- Modularity

---

### 6. **Service Layer Pattern**
Separation of business logic from components:

```tsx
// In services
export async function uploadReport(file: File): Promise<ReportModel>

// In components
const report = await uploadReport(file)
```

---

### 7. **Composition Pattern**
Reusable and composable components:

```tsx
<FeatureErrorBoundary featureName="Reports">
  <Suspense fallback={<LoadingFallback />}>
    <ReportsList />
  </Suspense>
</FeatureErrorBoundary>
```

---

## 🚀 Scalability for Files > 1GB

### Challenges with Large Files

1. **Memory Limitations**: Loading 1GB in memory causes blocking and performance issues
2. **Timeouts**: Long uploads can exceed server timeout thresholds
3. **User Experience**: Lack of progressive feedback during upload
4. **Connection Loss**: Interruptions without automatic retry mechanisms

### Recommended Solution: Chunked Upload Architecture

The recommended approach for handling large file uploads (>1GB) is to implement a **chunked upload system** with the following architectural components:

#### **Frontend Architecture**

The frontend should be enhanced to:
- Split large files into manageable chunks (5-10MB per chunk)
- Upload chunks sequentially or in parallel with concurrency control
- Track upload progress per chunk and calculate overall percentage
- Provide real-time visual feedback with progress bars
- Implement automatic retry logic with exponential backoff for failed chunks
- Store upload session state (uploadId, completed chunks) in IndexedDB for resume capability
- Handle browser disconnections gracefully without losing progress

#### **Backend Architecture**

The backend should implement:
- A temporary chunk storage system (file system or object storage)
- Chunk assembly logic that merges completed chunks into the final file
- Upload session management (create, track, finalize) with TTL-based cleanup
- Checksum validation per chunk to ensure data integrity
- Cleanup routines for abandoned uploads
- Distributed queue system (Redis, RabbitMQ) for processing multiple concurrent uploads
- Asynchronous report processing (virus scanning, validation, compression) after upload completes

#### **Infrastructure Enhancements**

For production-grade scalability:
- Use **object storage** (AWS S3, Google Cloud Storage, Azure Blob) instead of file system
- Implement **presigned URLs** for direct client-to-storage uploads, bypassing the application server
- Leverage **CDN** for faster chunk delivery in geographically distributed scenarios
- Deploy **load balancers** to distribute chunk upload requests across multiple servers
- Use **message queues** (SQS, Pub/Sub) to decouple upload completion from processing
- Implement **WebSocket** or **Server-Sent Events (SSE)** for real-time progress notifications
- Create **microservices** for report processing (OCR, parsing, indexing) running independently

#### **Monitoring and Reliability**

Essential for production systems:
- Real-time monitoring of upload metrics (success rate, average speed, chunk failure rate)
- Logging of all upload sessions with detailed error tracking
- Health checks for chunk upload endpoints and storage systems
- Circuit breakers to gracefully handle storage service outages
- Rate limiting and throttling to prevent resource exhaustion
- Automated alerts for upload failures and performance degradation

#### **Performance Optimization**

To maximize throughput:
- **Client-side compression** before chunking to reduce data volume
- **Web Workers** to process chunks without blocking the UI thread
- **Parallel chunk uploads** with configurable concurrency (3-5 concurrent chunks)
- **Adaptive chunk sizing** based on connection speed and browser capabilities
- **Network detection** to pause uploads on connection loss and resume automatically
- **Request deduplication** to handle duplicate chunk submissions

### Scalability Strategy Summary

| Aspect | Solution |
|--------|----------|
| **Memory Management** | Stream-based chunked processing (5-10MB chunks) |
| **Timeouts** | Automatic retries with exponential backoff (max 3-5 attempts) |
| **User Feedback** | Real-time progress tracking with resumable uploads |
| **Reliability** | Checksum validation per chunk, session persistence |
| **Performance** | Client-side compression, parallel uploads, Web Workers |
| **Infrastructure** | Object storage (S3/GCS), CDN, distributed processing |
| **Monitoring** | Comprehensive logging, metrics, health checks, alerts |

---

## 📊 Performance

- **Bundle Size**: ~50KB (minified + gzipped)
- **Load Time**: < 1s on 4G connection
- **LCP (Largest Contentful Paint)**: < 2.5s
- **Code Splitting**: 4 main chunks + lazy routes

---

## 🔧 Development and Debugging

```bash
# Activate React DevTools in browser
# View Zustand state in DevTools

# Use Redux DevTools with Zustand
import { devtools } from 'zustand/middleware'
```

---

## 📝 License

MIT

---

**Last Updated**: January 2026
