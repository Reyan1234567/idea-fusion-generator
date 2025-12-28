# Idea Fusion Generator

A web-based application that generates innovative ideas by fusing user prompts with real-world insights from social media platforms like Reddit. Leveraging AI, it analyzes extracted problems and concepts to produce structured, actionable ideas for creativity and innovation.

## Features

- **Idea Generation**: Input a prompt and optionally a subreddit; the app fetches Reddit data, extracts problems, and uses AI to generate ideas with titles, descriptions, target audiences, and feasibility ratings.
- **User Authentication**: Secure signup, login, and email verification with JWT-based sessions.
- **Idea Management**: View, bookmark, and save generated ideas; access them in a personalized dashboard.
- **Discussion Threads**: Collaborate on ideas with comment-based discussions.
- **Social Media Integrations**: Pull data from Reddit (posts, comments).
- **AI-Powered**: Uses Google Gemini (and OpenAI) for natural language processing and idea synthesis.
- **Responsive UI**: Dark/light mode toggle with a modern interface built on Next.js and Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Next.js API routes, server actions
- **Database**: MongoDB with Mongoose
- **AI/ML**: Google Gemini API, OpenAI API
- **Authentication**: JWT, bcrypt, refresh tokens
- **Integrations**: Reddit API, Nodemailer for emails

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or cloud instance)
- API keys for Google Gemini

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd idea-fusion-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:

   ```
   MONGODB_URI=your-mongodb-connection-string
   GEMINI_API_KEY=your-google-gemini-api-key
   EMAIL_API= your-api-key-from-provider
   JWT_ACCESS_SECRET=your-jwt-access-token-secret
   JWT_REFRESH_SECRET=your-jwt-refresh-token-secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Sign up or log in.
2. Navigate to the home page and enter a prompt (e.g., "Ideas for sustainable urban transport").
3. Optionally select a subreddit for Reddit data integration.
4. Generate ideas and explore them.
5. Bookmark favorites or start discussions.
