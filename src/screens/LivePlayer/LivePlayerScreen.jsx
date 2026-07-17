import { useState } from "react";
import PlayerCard from "./PlayerCard.jsx";
import { getRandomPlayer, updateOrderStatus } from "../../api/mdgn.js";

export default function LivePlayerScreen() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Waiting for a player...");
  const [error, setError] = useState(null);

  const apiConfig = {
    user: "example",
    platform: "cons",
    secretKey: "YOUR_SECRET_KEY_HERE",
    maximumBuyOutPrice: 300000,
    minimumBuyOutPrice: 4000,
    botapp: "MyFifaBot",
    playerType: 2,
  };

  async function handleFetchPlayer() {
    setLoading(true);
    setError(null);
    setStatusMessage("Fetching player...");

    try {
      const data = await getRandomPlayer(apiConfig);

      if (data.error) {
        setPlayer(null);
        setStatusMessage("No player available.");
        setError(`${data.error} (code ${data.code})`);
      } else {
        setPlayer(data);
        setStatusMessage("Player found! Buy within 5 minutes.");
      }
    } catch {
      setError("Network error.");
      setStatusMessage("Failed to fetch player.");
    } finally {
      setLoading(false);
    }
  }

  async function handleBought() {
    if (!player) return;

    setLoading(true);
    setError(null);
    setStatusMessage("Updating status...");

    try {
      const res = await updateOrderStatus({
        user: apiConfig.user,
        platform: apiConfig.platform,
        secretKey: apiConfig.secretKey,
        transactionID: player.transactionID,
        status: "bought",
        emailHash: "YOUR_FIFA_ACCOUNT_EMAIL_MD5",
      });

      if (res.error) {
        setError(`${res.error} (code ${res.code})`);
      } else {
        setStatusMessage("Status updated: bought.");
        setPlayer(null);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!player) return;

    setLoading(true);
    setError(null);
    setStatusMessage("Canceling...");

    try {
      const res = await updateOrderStatus({
        user: apiConfig.user,
        platform: apiConfig.platform,
        secretKey: apiConfig.secretKey,
        transactionID: player.transactionID,
        status: "cancel",
        emailHash: "",
        code: 551,
      });

      if (res.error) {
        setError(`${res.error} (code ${res.code})`);
      } else {
        setStatusMessage("Status updated: cancel.");
        setPlayer(null);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: "bold" }}>MDGN Bot</div>
          <div style={{ opacity: 0.7 }}>
            Platform {apiConfig.platform} · User {apiConfig.user}
          </div>
        </div>

        <button
          onClick={handleFetchPlayer}
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #00e676 0%, #1de9b6 50%, #64ffda 100%)",
            border: "none",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {loading ? "Working..." : "Start / Fetch Player"}
        </button>
      </header>

      <div style={{ opacity: 0.8 }}>{statusMessage}</div>

      {error && <div style={{ color: "#ff5252" }}>Error: {error}</div>}

      <div style={{ flex: 1 }}>
        {!player && (
          <div style={{ textAlign: "center", opacity: 0.8 }}>
            Waiting for a player...
          </div>
        )}

        {player && (
          <PlayerCard
            player={player}
            onBought={handleBought}
            onCancel={handleCancel}
          />
        )}
      </div>

      <footer style={{ opacity: 0.7, fontSize: 12 }}>
        Optimal interval: 10–15 seconds.  
        Buy within 5 minutes.  
        Update status before lockExpires.
      </footer>
    </div>
  );
}
