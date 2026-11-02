# 💱 Currency Converter

A modern, responsive Currency Converter built with **React.js** and the **Frankfurter API**. Convert amounts between supported currencies using the latest available reference exchange rates.

## 🚀 Features

- 💱 **Currency Conversion:** Convert amounts between supported currencies.
- 🌍 **Multiple Currencies:** Select from USD, EUR, GBP, and AFN.
- 🔄 **Swap Currencies:** Quickly switch the source and target currencies.
- ⚡ **Dynamic Conversion:** Update the converted amount when the amount or currency selection changes.
- 🔗 **API Integration:** Fetch exchange rates from the Frankfurter API.
- ⏳ **Loading State:** Display a loading message while fetching rates.
- ❌ **Error Handling:** Show an error message if a request fails.
- 📱 **Responsive Design:** Adapt the interface to different screen sizes.
- 🎨 **Modern UI:** Dark theme, gradient accents, and a clean interface.
- 🧹 **Request Cleanup:** Use `AbortController` to cancel outdated requests.

## 🛠️ Technologies Used

- **React.js** — Building the user interface.
- **JavaScript (ES6+)** — Application logic and currency calculations.
- **CSS3** — Styling and responsive layouts.
- **Frankfurter API** — Retrieving exchange-rate data.
- **React Hooks** — Managing component state and side effects.

## 🌐 API Reference

This project uses the free Frankfurter API, which does not require an API key.

**Official documentation:** https://frankfurter.dev/

### Example API Endpoint

```text
https://api.frankfurter.dev/v2/rate/USD/EUR
```

This endpoint retrieves the exchange rate from US Dollars (USD) to Euros (EUR).

### Example Response

```json
{
  "date": "2026-10-30",
  "base": "USD",
  "quote": "EUR",
  "rate": 0.86
}
```

_The date and exchange rate above are illustrative._

The application uses the `rate` property to calculate the converted amount.

**Note:** The API's supported currencies depend on its available reference data. Verify that a currency pair is supported before using it.

## 📦 Installation and Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Navigate to the Project Directory

```bash
cd YOUR_PROJECT_FOLDER
```

Replace `YOUR_PROJECT_FOLDER` with your actual project folder name.

### 3. Install Dependencies

If you're using Vite:

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the application.

## 📁 Project Structure

```text
src/
├── components/
│   ├── Challange.jsx
│   └── Challange.css
├── App.jsx
└── main.jsx
```

- `Challange.jsx` — Contains the React components, API requests, state management, and conversion logic.
- `Challange.css` — Contains the application styles and responsive design.
- `App.jsx` — Main application component.
- `main.jsx` — Application entry point.

## ⚙️ How It Works

1. Enter the amount you want to convert.
2. Select the source currency.
3. Select the target currency.
4. The application requests the relevant exchange rate from the Frankfurter API.
5. React calculates the converted amount using the returned rate.
6. Change the amount to see the result update without making another API request.
7. Use the swap button to reverse the selected currencies.

### React Concepts Practiced

This project demonstrates the following React concepts:

- `useState` for managing amounts, currencies, exchange rates, loading states, and errors.
- `useEffect` for fetching exchange rates when currency selections change.
- `fetch()` for making HTTP requests.
- `async/await` for handling
