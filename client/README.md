# Event Management System - Client

This is the frontend client for the Event Management System. It provides the user interface for interacting with the system.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web development.
- **React Router:** For routing and navigation.
- **Redux Toolkit:** For state management.
- **Tailwind CSS:** A utility-first CSS framework.
- **Radix UI:** For accessible UI components.
- **React Hook Form:** For building forms.
- **Chart.js:** For creating charts and graphs.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1.  Clone the repository.
2.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the `client` directory and add the following environment variable:
    ```
    VITE_API_URL=http://localhost:5000/api
    ```

### Running the Development Server

To run the client in development mode:

```bash
npm run dev
```

The application will be running on `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production build of the application:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Folder Structure

```
client/
├── src/
│   ├── assets/         # Static assets like images and SVGs
│   ├── components/     # Reusable UI components
│   ├── constants/      # Application constants
│   ├── lib/            # Utility functions and schemas
│   ├── pages/          # Application pages/routes
│   ├── state/          # Redux store and API slices
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
└── index.html          # Main HTML file
```