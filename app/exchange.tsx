

"use client";
import { useState } from "react";

export default function CurrencyApp() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const convertCurrency = async () => {
    if (!amount) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://api.exchangerate.host/latest?base=${from}`
      );

      const data = await res.json();
      const rate = data.rates[to];

      const converted = (amount * rate).toFixed(2);
      setResult(null);

    } catch (error) {
      console.error("Conversion error:", error);
      setResult((null));
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 space-y-6">

          {/* Amount Input */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-transparent text-4xl font-semibold text-white outline-none placeholder:text-gray-500"
          />

          {/* Currency Selectors */}
          <div className="space-y-4">

            <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3">
              <span className="text-gray-400">From</span>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-transparent text-white outline-none"
              >
                <option>USD</option>
                <option>NGN</option>
                <option>EUR</option>
              </select>
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3">
              <span className="text-gray-400">To</span>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-transparent text-white outline-none"
              >
                <option>NGN</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>

          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="bg-white/10 hover:bg-white/20 transition p-3 rounded-full text-white"
            >
              ⇅
            </button>
          </div>

          {/* Result */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">Converted Amount</p>

            <h2 className="text-3xl font-bold text-white">
              {loading
                ? "Converting..."
                : result
                  ? `${to} ${result}`
                  : `${to} 0.00`}
            </h2>
          </div>

          {/* Convert Button */}
          <button
            onClick={convertCurrency}
            className="w-full bg-white text-black font-semibold py-3 rounded-2xl hover:opacity-90 transition"
          >
            Convert
          </button>

        </div>
      </div>
    </div>
  );
}