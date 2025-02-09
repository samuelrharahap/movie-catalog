
# Disney Hotstar Clone

This is a **movie database catalog web app** built using **Next.js 15 with the App Router (**`**app/**` **directory)**. It leverages **SSR (Server-Side Rendering) and CSR (Client-Side Rendering)** strategically for performance and SEO benefits.

## 🚀 Features

-   **Home Page**: Partially SSR (above-the-fold content rendered on the server)
-   **Detail Page**: Partially SSR (above-the-fold content rendered on the server)
-   **Watchlist Page**: CSR
-   **Search Page**: CSR
-   **Optimized Image Loading** (LCP priority & progressive image loading)
-   **State Management**: Zustand (optimized with `Map` for better performance)
-   **Unit Tests**: Coverage for key pages (Home, Detail, Watchlist, Search)


## 🛠 Setup & Installation

### 1. Environment Variables
Before running the project, you need to set up environment variables.
-   Copy `.env.sample` to `.env`
-   Obtain **API Key** and **API Access Token** from [The Movie Database (TMDb)](https://www.themoviedb.org/) and fill them in the `.env` file.
    
### 2. Install Dependencies
```
npm install
```
### 3. Run Development Server
```
npm run dev
```
### 4. Build & Start Production Server
```
npm run build
npm run start
```
### 5. Run Unit Tests
```
npm run test        # Run unit tests
npm run test:coverage  # Run tests and generate coverage report
```


## 🎯 Technical Decisions & Optimizations

### 1. **SSR vs CSR**
-   **Home & Detail Pages**: Only the **above-the-fold content** is server-rendered.
    -   **Why?**
        -   Improves perceived performance (fast initial render).
        -   Ensures **SEO** relevance (critical keywords are available immediately).
-   **Watchlist & Search Pages**: Fully **CSR**.
    -   **Why?**
        -   Less critical for SEO.
        -   Reduces server load by handling content on the client side.
            
### 2. **Image Optimization**
-   **LCP (Largest Contentful Paint) Images Prioritized**.
-   **Progressive Image Loading**:
    -   Initially loads a **low-resolution** image.
    -   **High-resolution image loads in the background**, replacing the low-res version once ready.
        
### 3. **State Management with Zustand**
-   Zustand is used for managing the **watchlist**.
-   Instead of an **array**, a **Map** is used for better performance:
    -   Faster lookups.
    -   Improved efficiency when adding/removing items.


## 📌 Tech Stack
-   **Next.js 15 (App Router)**
-   **TypeScript**
-   **React Query + Axios** (for data fetching)
-   **Zustand** (for state management)
-   **Vitest + @testing-library/react** (for unit testing)
-   **The Movie Database API** (for movie data)

## 📌 Live Application
- https://movie-catalog-taupe.vercel.app/
