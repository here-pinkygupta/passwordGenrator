
import React, { useState, useEffect, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (charAllow) str += "@#$&'!~*^";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllow, charAllow]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyClipboard = () => {
    if (passRef.current) {
      passRef.current.select();
      navigator.clipboard.writeText(password);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">Password Generator</h1>


        <div className="flex items-center justify-between bg-gray-200 text-black px-3 py-2 rounded mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full bg-transparent text-lg font-medium"
            placeholder="Password"
            ref={passRef}
            readOnly
          />
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded ml-2"
            onClick={passwordGenerator}
          >
            Generate
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="text-gray-600 font-medium">Password Length: {length}</label>
          <input
            type="range"
            min={1}
            max={50}
            value={length}
            className="cursor-pointer accent-red-500"
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>


        <div className="flex flex-col space-y-3 mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={charAllow}
              id="characterInput"
              onChange={() => setCharAllow((prev) => !prev)}
              className="mr-2 accent-red-500"
            />
            <label htmlFor="characterInput" className="text-gray-600 font-medium cursor-pointer">
              Include Symbols (@#$&'!~*^)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numAllow}
              id="numberInput"
              onChange={() => setNumAllow((prev) => !prev)}
              className="mr-2 accent-red-500"
            />
            <label htmlFor="numberInput" className="text-gray-600 font-medium cursor-pointer">
              Include Numbers (0-9)
            </label>
          </div>
        </div>


        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
          onClick={copyClipboard}
        >
          Copy Password
        </button>
      </div>
    </div>
  );
}

export default App;
