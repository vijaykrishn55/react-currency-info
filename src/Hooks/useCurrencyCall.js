// Modify useCurrencyCall hook to handle loading and error states
import { useState, useEffect } from "react";

function useCurrencyCall(currency){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((res) => {
            setData(res[currency]);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, [currency]);

    return { data, loading, error };
};

export default useCurrencyCall;
