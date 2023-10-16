import React, { useState } from "react";
import InputBox from "./components/input"; // Make sure the path is correct
import useCurrencyCall from "./Hooks/useCurrencyCall"; // Make sure the path is correct
import './App.css';
import bgImage from "./backgroundImg.jpg"

const App = () => {
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [amount, setAmount] = useState(1);
    const { data: currencyInfo, loading, error } = useCurrencyCall(from);
    const options = currencyInfo ? Object.keys(currencyInfo) : [];
    const [convertedAmount, setConvertedAmount] = useState(0);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to]);
    };

    return (
        <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{backgroundImage: `url(${bgImage})`}}
   >
   

            {/* Loading and error states logic */}
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            {!loading && !error && (
                <div className="w-full">
                    <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                convert();
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => {
                                        setFrom(currency);
                                    }}
                                    onAmountChange={(amount) => {
                                        setAmount(amount);
                                    }}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                    onClick={swap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => {
                                        setTo(currency);
                                    }}
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                                Convert 
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
