import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
        try {
            const url = `http://localhost:5000/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
            const response = await axios.get(url);
            setExchangeRate(response.data.rate);
            setConvertedAmount(response.data.convertedAmount);
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };
    getExchangeRate();
}, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    if (exchangeRate !== null) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]); 

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <>
      <div className="currency-convertor">
        <div className="box"></div>
        <div className="data">
          <h1>Convert-O-Matic</h1>
          <div className="input-container">
            <label htmlFor="amt">AMOUNT :</label>
            <input type="number" id="amt" value={amount} onChange={handleAmountChange}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">FROM :</label>
            <select id="fromCurrency" value={fromCurrency} onChange = {handleFromCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">TO :</label>
            <select id="toCurrency" value={toCurrency} onChange = {handleToCurrencyChange}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
        </div>
        <div className="result">
          <p> 
            {amount} {fromCurrency} = {convertedAmount} {toCurrency} 
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
