import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav style={{
        padding: "16px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        gap: "12px"
      }}>
        <Link to="/">Home</Link>
        <Link to="/live">Live Player</Link>
        <Link to="/chat">Chat</Link>
      </nav>

      <div style={{ padding: "16px" }}>
        <Outlet />
      </div>
    </div>
  );
}
