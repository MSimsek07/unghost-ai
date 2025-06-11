# AI-Powered Job Application Tracker

This application helps users track their job applications throughout the hiring process. It leverages AI to provide tips for improving job applications and to help generate follow-up emails.

## Features

- User authentication (register, login, reset password)
- CRUD operations for job applications (Create, Read, Update, Delete)
- Dashboard to view and manage applications
- AI-powered suggestions for application improvement
- AI-powered generation of follow-up emails
- Responsive design for use on various devices

## Tech Stack

- Next.js (React framework)
- Firebase (Authentication, Firestore, Hosting)
- Genkit (AI integration)
- Tailwind CSS (Styling)
- Shadcn/ui (UI Components)
- TypeScript

## Getting Started

This section will guide you through setting up and running the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v20 or later recommended)
- npm (usually comes with Node.js) or yarn
- Firebase CLI (for Firebase project setup and deployment). You can install it globally using `npm install -g firebase-tools`.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    ```
    (Replace with your repository's actual URL if you are cloning it for the first time.)

2.  **Navigate to the project directory:**
    ```bash
    cd your-repository-name
    ```
    (Replace `your-repository-name` with the actual directory name.)

3.  **Install dependencies:**
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```

### Configuration

#### Firebase Setup

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project (or use an existing one).
2.  Enable **Authentication**:
    *   In the Firebase console, navigate to Authentication > Sign-in method.
    *   Enable the "Email/Password" provider.
3.  Enable **Firestore**:
    *   In the Firebase console, navigate to Firestore Database.
    *   Click on "Create database" and set up your Firestore rules (start in test mode for development if you prefer, but secure your rules for production).
4.  Obtain your Firebase project configuration:
    *   In the Firebase console, go to Project settings (click the gear icon next to "Project Overview").
    *   Under the "General" tab, scroll down to "Your apps".
    *   Click on the "</>" icon (Web) to create a new web app or select an existing one.
    *   You'll find your Firebase SDK snippet config (apiKey, authDomain, projectId, etc.).

#### Environment Variables

1.  Create a `.env.local` file in the root of the project by copying the `.env.example` file:
    ```bash
    cp .env.example .env.local
    ```
2.  Populate the `.env.local` file with your Firebase project configuration keys obtained in the previous step.
    ```
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

    # Genkit/Google AI Configuration (if applicable)
    # GOOGLE_API_KEY=your_google_api_key
    ```
    **Important:** Make sure that `NEXT_PUBLIC_FIREBASE_PROJECT_ID` matches your actual Firebase Project ID.
    If you are using Genkit with Google AI, you will also need to set `GOOGLE_API_KEY`. You can obtain this key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Development Server

Once the installation and configuration are complete, you can start the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:9002` (as configured in `package.json`).

---

## Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`
    -   Runs the Next.js development server with Turbopack.
    -   The application will be available at `http://localhost:9002`.

-   `npm run genkit:dev`
    -   Starts the Genkit development server for AI flows.
    -   This is typically used for testing and developing your AI features locally.

-   `npm run genkit:watch`
    -   Starts the Genkit development server in watch mode.
    -   It will automatically restart the server when changes are detected in your Genkit flow files.

-   `npm run build`
    -   Builds the Next.js application for production.
    -   The optimized production build will be placed in the `.next` folder.

-   `npm run start`
    -   Starts the Next.js production server.
    -   This command should be run after building the application with `npm run build`.

-   `npm run lint`
    -   Lints the codebase using Next.js's built-in ESLint configuration.
    -   Checks for code quality, potential errors, and style issues.

-   `npm run typecheck`
    -   Runs the TypeScript compiler (`tsc`) to check for type errors in the project.
    -   Ensures type safety throughout the application.

## Folder Structure

Here's an overview of the key directories and their purposes:

-   `src/app/`: Contains the main application routes, pages, and layouts as per Next.js App Router conventions.
-   `src/components/`: Houses reusable UI components used throughout the application.
    -   `src/components/auth/`: Components specific to authentication (login, registration forms).
    -   `src/components/application/`: Components related to job application features.
    -   `src/components/layout/`: Layout components like navbars and sidebars.
    -   `src/components/ui/`: General-purpose UI elements, likely from Shadcn/ui.
-   `src/ai/`: Includes Genkit AI flow definitions and related configurations.
    -   `src/ai/flows/`: Specific AI flow implementations (e.g., generating tips, emails).
-   `src/lib/`: Contains utility functions, constants, and other shared library code.
-   `src/contexts/`: Stores React context providers (e.g., `AuthContext` for managing authentication state).
-   `src/hooks/`: Holds custom React hooks for reusable component logic.
-   `src/types/`: TypeScript type definitions for the project.
-   `public/`: Stores static assets like images and favicons, directly accessible via the base URL.
-   `docs/`: Contains project documentation (e.g., `blueprint.md`).

## Deployment

This project is configured for deployment using Firebase.

1.  **Firebase Project Setup**:
    *   Ensure your Firebase project is configured correctly as detailed in the "Getting Started > Configuration" section. This includes setting up Authentication and Firestore.

2.  **Install Firebase CLI**:
    *   If you haven't already, install the Firebase Command Line Interface globally:
        ```bash
        npm install -g firebase-tools
        ```

3.  **Login to Firebase**:
    *   Authenticate with your Firebase account:
        ```bash
        firebase login
        ```

4.  **Select Firebase Project**:
    *   Associate your local project with your Firebase project:
        ```bash
        firebase use <your-project-id>
        ```
        (Replace `<your-project-id>` with your actual Firebase Project ID)

5.  **Build the Application**:
    *   Create a production build of your Next.js application:
        ```bash
        npm run build
        ```

6.  **Deploy to Firebase**:
    *   Deploy the application:
        ```bash
        firebase deploy
        ```
    *   The `apphosting.yaml` file in the repository is configured for Firebase App Hosting, which simplifies the deployment of Next.js applications. If you were using traditional Firebase Hosting, you might need a `firebase.json` configuration file.

Your application should now be deployed and accessible via the URL provided by Firebase.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is currently not licensed. Consider adding an [MIT License](https://opensource.org/licenses/MIT) or another open-source license if you plan to share this code publicly.
