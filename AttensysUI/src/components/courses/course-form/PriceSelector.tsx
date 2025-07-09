import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import {
  courseInitState,
  connectorAtom,
} from "@/state/connectedWalletStarknetkitNext";

interface PriceSelectorProps {
  exchangeRate: number;
}

const PriceSelector = ({ exchangeRate }: PriceSelectorProps) => {
  const [inputMode, setInputMode] = useState("USD"); // 'USD' or 'STRK'
  const [usdValue, setUsdValue] = useState("");
  const [strkValue, setStrkValue] = useState("");
  const [courseData, setCourseData] = useAtom(courseInitState);

  useEffect(() => {
    if (inputMode === "USD" && usdValue !== "") {
      const value = parseFloat(usdValue);
      if (!isNaN(value)) {
        setStrkValue((value / exchangeRate).toFixed(4));
      } else {
        setStrkValue("");
      }
    }
  }, [usdValue, inputMode, exchangeRate]);

  const handleUsdChange = (e: any) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setUsdValue(value);
      setInputMode("USD");
    }
    setCourseData((prevData) => ({
      ...prevData,
      price: Number(value),
    }));
  };

  return (
    <div className="max-w-md bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Pricing Preview</h2>
        <div className="text-sm text-gray-500">
          Rate: 1 STRK = ${exchangeRate.toFixed(4)}
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        <div
          className={`p-4 border rounded-lg transition-all duration-200 ${inputMode === "USD" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
        >
          <label
            htmlFor="usd"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            USD Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              id="usd"
              value={usdValue}
              onChange={handleUsdChange}
              placeholder="0.00"
              className="block w-full pl-7 pr-12 py-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          {inputMode === "USD" ? (
            <span>
              <span className="font-medium text-gray-800">
                ${usdValue || "0.00"}
              </span>{" "}
              USD ={" "}
              <span className="font-medium text-purple-600">
                {strkValue || "0.0000"}
              </span>{" "}
              STRK
            </span>
          ) : (
            <span>
              <span className="font-medium text-purple-600">
                {strkValue || "0.0000"}
              </span>{" "}
              STRK ={" "}
              <span className="font-medium text-gray-800">
                ${usdValue || "0.00"}
              </span>{" "}
              USD
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PriceSelector;
