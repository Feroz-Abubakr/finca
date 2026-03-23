export default function Sidebar({ setPage }) {

  return (
    <div style={{
      width: "250px",
      background: "#0b1f3a",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h2>Sarafi</h2>

      <div style={{ marginTop: "30px", cursor: "pointer" }}
        onClick={() => setPage("dashboard")}>
        Dashboard
      </div>

      <div style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => setPage("transactions")}>
        Transactions
      </div>

      <div style={{ marginTop: "20px", cursor: "pointer" }}
        onClick={() => setPage("exchange")}>
        Exchange
      </div>

    </div>
  );

}