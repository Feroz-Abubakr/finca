import { useEffect, useState } from "react";

export default function Transactions(){

  const [tx,setTx] = useState([]);

  useEffect(()=>{

    fetch("http://localhost:5000/transactions")
    .then(res=>res.json())
    .then(setTx)

  },[])

  return(

    <div>

      <h1>Transactions</h1>

      <table border="1">

        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Rate</th>
            <th>Result</th>
          </tr>
        </thead>

        <tbody>

          {tx.map(t=>(
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.amount}</td>
              <td>{t.rate}</td>
              <td>{t.result}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}