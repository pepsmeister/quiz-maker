# Simple Quiz Builder App

## Running the App Locally

1. **Install dependencies:**
   npm install
2. **Start the development server:**
   npm run dev
3. Open your browser to the local server URL (usually http://localhost:5173).

## Architecture Decisions & Trade-offs

- **Feature-based Project Structure:**
  - Each major feature has its own folder under `src/features/` (e.g., `quiz-builder`, `quiz-dashboard`, `quiz-player`, `quiz-results`).
  - Inside each feature folder, there are subfolders for `components`, `api`, `hooks`, `constants`, `types`, `utils`, and other domain-specific code.
  - This structure keeps related code together, making it easier to scale and maintain as the app grows.

- **Component Organization:**
  - Components used only by a specific feature are placed inside that feature's `components` folder.
  - Shared or global components can be placed in a common directory if needed

- **API Layer:**
  - API calls for each feature are encapsulated in an `api` folder within the feature, keeping data-fetching logic close to where it's used.

- **Constants, Types, and Utils:**
  - Each feature can define its own constants, types, and utility functions, reducing cross-feature dependencies and improving code clarity.

- **Trade-offs:**
  - **Pros:**
    - High modularity and separation of concerns.
    - Easier onboarding for new developers; features are self-contained.
    - Scales well for large applications.
  - **Cons:**
    - May introduce some duplication if features need similar utilities or types (can be refactored into shared folders as needed).
    - Navigating between features may be less direct for very small projects.

## Main Libraries Used

- **React Hook Form**: For building performant, flexible, and easy-to-use forms with minimal re-renders.
- **Yup**: For schema-based form validation, integrated with React Hook Form for validation logic.
- **React Router DOM**: For client-side routing and navigation between different views and features.
- **TanStack Query**: Used for state management and handling API calls, providing efficient data fetching, error handling, caching, and synchronization with the server.

---
