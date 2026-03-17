# 💱 Top Currency Pet Project

A full-stack web application built to track real-time cryptocurrency data and fiat exchange rates. 

This project consists of a **Python (FastAPI)** backend that fetches and caches data from external APIs, and a **React (Vite)** frontend that provides a clean, responsive user interface using **Ant Design** and **TailwindCSS**.

## ✨ Features

- **Cryptocurrency Tracker**: View real-time data for top cryptocurrencies, including current price in USD, market capitalization, and 24-hour price changes.
- **Fiat Exchange Rates**: Check the latest fiat currency exchange rates (e.g., EUR, GBP, ILS, JPY, CNY) relative to the US Dollar (USD).
- **Caching Mechanism**: The backend uses `aiocache` to temporarily store API responses (1-24 hours depending on the data type) to optimize performance and reduce third-party API limits.
- **Responsive UI**: A modern interface with a sidebar navigation menu and interactive data cards.

## 🛠️ Tech Stack

### Frontend
- **React 19** (initialized with Vite)
- **TailwindCSS v4** for utility-first styling
- **Ant Design (antd)** for UI components (Menu, Cards, Spinners, Alerts)
- **Prop-Types** for type-checking components

### Backend
- **Python 3**
- **FastAPI** for building the REST API
- **aiohttp** for asynchronous HTTP requests to external services
- **aiocache** for caching responses
- **Uvicorn** as the ASGI web server
- **Pydantic** for data validation and settings management

### External APIs Used
- [CoinMarketCap API](https://coinmarketcap.com/api/) (Cryptocurrency data)
- [ExchangeRate-API](https://www.exchangerate-api.com/) (Fiat currency rates)

---

## 🚀 How to Run the Project Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed on your computer:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (v3.9 or higher recommended)

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/YourUsername/YourRepositoryName.git
cd YourRepositoryName
\`\`\`

### 2. Backend Setup

1. Open a terminal and navigate to the project root directory.
2. Create and activate a virtual environment (optional but recommended):
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   \`\`\`
3. Install the required Python packages:
   \`\`\`bash
   pip install fastapi uvicorn aiohttp aiocache pydantic pydantic-settings
   \`\`\`
4. Create a `.env` file in the root directory (where `backend` folder is located) and add your API keys:
   \`\`\`env
   CMC_API_KEY=your_coinmarketcap_api_key_here
   ER_API_KEY=your_exchangerate_api_key_here
   \`\`\`
5. Start the FastAPI server:
   \`\`\`bash
   uvicorn backend.src.main:app --reload
   \`\`\`
   *The backend will be running at `http://localhost:8000`.*

### 3. Frontend Setup

1. Open a new terminal window and navigate to the `frontend` directory:
   \`\`\`bash
   cd frontend
   \`\`\`
2. Install the Node dependencies:
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`
3. Start the Vite development server:
   \`\`\`bash
   npm run dev
   \`\`\`
   *The frontend will be running at `http://localhost:5173`.*

---

## 👨‍💻 Author

**MicLord**
- GitHub: [@MicLord-4MB](https://github.com/MicLord-4Mb)