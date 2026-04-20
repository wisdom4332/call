

'use client'
import { useState, useEffect } from "react"

function Home() {

  const [input, setInput] = useState<string>("");
  const [computed, setComputed] = useState<number | string>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false); // ✅ toggle state

  // Load history when app starts
  useEffect(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history whenever it changes
  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history));
  }, [history]);

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const clearAll = () => {
    setInput("");
    setComputed(0);
  };

  const handleCalculate = () => {
    try {
      const res = eval(input);

      setComputed(res);

      setHistory((prev) => [
        ...prev,
        `${input} = ${res}`
      ]);

      setInput("");
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    "9", "8", "7",
    "6", "5", "4",
    "3", "2", "1",
    "0", ".",
  ];

  const opr = ["/", "*", "-", "+"];

  return (
    <div className="flex justify-center items-center   lg:h-screen">

      {/* ✅ TOGGLE BUTTON (only small screen) */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="lg:hidden fixed top-5 right-5 z-50 bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold"
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>

      <div className="w-full lg:flex justify-between p-10">

        {/* ✅ HISTORY SECTION (fixed logic) */}
        <div
          className={`
            mt-20 bg-gray-600 rounded-3xl p-4 overflow-y-auto max-h-[400px]
            ${showHistory ? "block" : "hidden"} 
            lg:block w-full lg:w-[20%]
          `}
        >
          <h3 className="text-white text-xl mb-2">History</h3>

          {history.map((item, index) => (
            <p
              key={index}
              onClick={() => setInput(item.split(" = ")[0])}
              className="text-white cursor-pointer hover:text-yellow-300"
            >
              {item}
            </p>
          ))}
        </div>

        {/* ✅ CALCULATOR */}
        <div>

          {/* Input */}
          <div className="mt-20  font-bold flex justify-center items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full outline-none p-2 text-right text-5xl placeholder-gray-500 bg-transparent"
              placeholder="0"
            />
          </div>

          {/* Result */}
          <p className="text-4xl font-bold text-right px-2">
            {computed}
          </p>

          {/* Buttons */}
          <div className="flex flex-col">
            <div className="mt-5 grid grid-cols-4 gap-3">

              <button
                className="bg-red-600 text-white text-3xl font-bold rounded-full h-14"
                onClick={clearAll}
              >
                AC
              </button>

              {opr.map((val, index) => (
                <button
                  key={index}
                  className="bg-gray-400 text-white text-3xl font-bold rounded-full h-14"
                  onClick={() => handleClick(val)}
                >
                  {val}
                </button>
              ))}

              {buttons.map((val, index) => (
                <button
                  key={index}
                  className="bg-gray-400 text-white text-3xl font-bold rounded-full h-14"
                  onClick={() => handleClick(val)}
                >
                  {val}
                </button>
              ))}

              <button
                className="bg-red-400 col-span-4 text-3xl font-bold text-white rounded-full h-14"
                onClick={handleCalculate}
              >
                =
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home