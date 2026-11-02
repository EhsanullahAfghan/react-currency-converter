import { useEffect, useState } from "react";
import "./Challange.css";

const Challenge = () => {
  const [query, setQuery] = useState("1");
  const [initialValue, setInitialValue] = useState("USD");
  const [compareValue, setCompareValue] = useState("EUR");

  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRate() {
      if (initialValue === compareValue) {
        setRate(1);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        setRate(null);

        const res = await fetch(
          `https://api.frankfurter.dev/v2/rate/${initialValue}/${compareValue}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Could not fetch the exchange rate.");
        }

        const data = await res.json();

        if (typeof data.rate !== "number") {
          throw new Error("Exchange rate was not found.");
        }

        setRate(data.rate);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRate();

    return () => controller.abort();
  }, [initialValue, compareValue]);

  const amount = Number(query);

  const result =
    query.trim() !== "" &&
    Number.isFinite(amount) &&
    amount >= 0 &&
    rate !== null
      ? (amount * rate).toFixed(2)
      : null;

  return (
    <main className="challenge">
      <section className="converter-card">
        {/* Header */}
        <header className="converter-header">
          <div className="converter-icon" aria-hidden="true">
            🌐
          </div>

          <h1>Currency Converter</h1>

          <p>Convert currencies with the latest available exchange rates.</p>
        </header>

        {/* Converter Controls */}
        <div className="converter-controls">
          {/* Amount Input */}
          <div className="field-group amount-group">
            <label className="field-label" htmlFor="amount">
              Amount
            </label>

            <Input query={query} setQuery={setQuery} />
          </div>

          {/* Source Currency */}
          <div className="field-group from-group">
            <label className="field-label" htmlFor="from-currency">
              From
            </label>

            <InitialValue
              initialValue={initialValue}
              setInitialValue={setInitialValue}
            />
          </div>

          {/* Swap Button */}
          <button
            className="swap-button"
            type="button"
            aria-label="Swap currencies"
            onClick={() => {
              setInitialValue(compareValue);
              setCompareValue(initialValue);
            }}
          >
            ⇄
          </button>

          {/* Target Currency */}
          <div className="field-group to-group">
            <label className="field-label" htmlFor="to-currency">
              To
            </label>

            <CompareValue
              compareValue={compareValue}
              setCompareValue={setCompareValue}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="status-message status-loading" role="status">
            Fetching exchange rate...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="status-message status-error" role="alert">
            {error}
          </div>
        )}

        {/* Conversion Result */}
        {!loading && !error && result !== null && (
          <div className="result-panel">
            <p className="result-caption">Converted Amount</p>

            <Output
              query={query}
              initialValue={initialValue}
              compareValue={compareValue}
              result={result}
              rate={rate}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="converter-footer">
          Exchange rates provided by Frankfurter.
          <br />
          Reference rates may differ from local exchange rates.
        </footer>
      </section>
    </main>
  );
};

function Input({ query, setQuery }) {
  return (
    <input
      id="amount"
      className="amount-input"
      type="number"
      min="0"
      step="any"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Enter amount"
    />
  );
}

function InitialValue({ initialValue, setInitialValue }) {
  return (
    <select
      id="from-currency"
      className="currency-select"
      value={initialValue}
      onChange={(e) => setInitialValue(e.target.value)}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="AFN">AFN</option>
    </select>
  );
}

function CompareValue({ compareValue, setCompareValue }) {
  return (
    <select
      id="to-currency"
      className="currency-select"
      value={compareValue}
      onChange={(e) => setCompareValue(e.target.value)}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="AFN">AFN</option>
    </select>
  );
}

function Output({ query, initialValue, compareValue, result, rate }) {
  return (
    <>
      <h2 className="result-amount">
        {result} <span>{compareValue}</span>
      </h2>

      <p className="exchange-rate">
        {query} {initialValue} = {result} {compareValue}
        <br />1 {initialValue} = {rate.toFixed(4)} {compareValue}
      </p>
    </>
  );
}

export default Challenge;
