import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Exchange from "./pages/Exchange";
import Transactions from "./pages/Transactions";

function App() {

  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex" }}>

      <Sidebar setPage={setPage} />

      <div style={{ padding: "30px", flex: 1 }}>

        {page === "dashboard" && <Dashboard />}
        {page === "exchange" && <Exchange />}
        {page === "transactions" && <Transactions />}

      </div>

    </div>
  );
}

export default App;