import { useEffect, useState } from "react";

export default function Dashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/dashboard")
      .then(res => res.json())
      .then(setData);

  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>

      <h1>Dashboard</h1>

      <div style={{display:"flex",gap:"20px"}}>

        <div style={card}>
          <h3>Cash USD</h3>
          <p>{data.cashUSD}</p>
        </div>

        <div style={card}>
          <h3>Cash AFN</h3>
          <p>{data.cashAFN}</p>
        </div>

        <div style={card}>
          <h3>Money Sent</h3>
          <p>{data.moneySent}</p>
        </div>

        <div style={card}>
          <h3>Money Received</h3>
          <p>{data.moneyReceived}</p>
        </div>

        <div style={card}>
          <h3>Total Transactions</h3>
          <p>{data.transactions}</p>
        </div>

      </div>

    </div>
  );
}

const card = {
  background:"#eee",
  padding:"20px",
  borderRadius:"10px",
  width:"150px"
};