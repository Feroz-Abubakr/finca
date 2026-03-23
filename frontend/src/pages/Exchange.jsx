import { useState } from "react";

export default function Exchange(){

  const [amount,setAmount] = useState("");
  const [rate,setRate] = useState("");
  const [result,setResult] = useState("");

  const exchange = async () => {

    const res = await fetch("http://localhost:5000/exchange",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        amount:Number(amount),
        rate:Number(rate)
      })
    });

    const data = await res.json();

    setResult(data.transaction.result);

  };

  return(

    <div>

      <h1>Exchange</h1>

      <input
      placeholder="Amount"
      value={amount}
      onChange={(e)=>setAmount(e.target.value)}
      />

      <br/><br/>

      <input
      placeholder="Rate"
      value={rate}
      onChange={(e)=>setRate(e.target.value)}
      />

      <br/><br/>

      <button onClick={exchange}>
        Exchange
      </button>

      <h2>Result: {result}</h2>

    </div>

  );
}