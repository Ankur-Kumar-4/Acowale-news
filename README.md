# Acowale-news

A responsive and dynamic news aggregator web application that allows users to search and filter news articles by category, country, and language. The app integrates a custom API to fetch news articles and presents them in a clean, user-friendly interface with pagination.

Project Setup
Frontend (Next.js)
Install Dependencies

bash
Copy code
npm install
Environment Setup

Create a .env.local file in the root directory and add the following:
makefile
Copy code
BASE_URL=<your_backend_API_endpoint>
Replace <your_backend_API_endpoint> with the actual URL of your backend server.
Development Mode

bash
Copy code
npm run dev
This will start the development server at http://localhost:3000.

Build for Production

bash
Copy code
npm run build
npm run start
Deployment (Firebase Hosting)

Initialize Firebase in the project directory.
bash
Copy code
firebase init
Deploy the app.
bash
Copy code
firebase deploy
Backend (Node.js with Express)
Install Dependencies

bash
Copy code
npm install
Environment Setup

Create a .env file in the root directory and add the following:
makefile
Copy code
PORT=5000
API_KEY=<your_news_api_key>
Replace <your_news_api_key> with your actual news API key.
Start the Server

bash
Copy code
npm start
The backend server will run on http://localhost:5000.

Overview of Approach
Frontend (Next.js): Utilized React hooks and Framer Motion to build a dynamic and interactive news interface. Data fetching is handled with a service-based approach using Axios to call the backend API. The UI is designed using Tailwind CSS and Lucide icons to maintain a responsive and modern layout.

Backend (Express): The backend fetches news articles from an external API, processes them, and serves them to the frontend. Axios is used for making API calls, and Express.js handles routing.

Pagination & Filters: The frontend includes search functionality and dropdown filters for category, country, and language. The backend handles the logic to fetch the appropriate data based on user input and returns paginated results to the frontend.

Challenges and Solutions
API Integration: One of the main challenges was integrating the news API and handling various query parameters for filtering. The solution involved ensuring that undefined or empty parameters were not sent in API requests, which avoided unnecessary errors.

State Management: Managing the state of the filters, search, and pagination required careful synchronization to ensure the UI updated seamlessly. We used React’s useState and useEffect hooks for clean state handling.

Pagination Handling: Implementing pagination required managing both frontend and backend coordination. On the frontend, pagination controls were designed to trigger API calls for new data, while the backend handled fetching the correct articles for each page.

Deployment: Deploying the project involved setting up Firebase Hosting for the frontend and ensuring the backend API endpoint was accessible. Handling CORS and other deployment-related configurations was key to ensuring smooth cross-origin requests between frontend and backend.

Links
Live App: https://aconews-84f4a.web.app/
GitHub Repository backed : https://github.com/Ankur-Kumar-4/Acowale-news-be
