export default function PlayerCard({ player, onBought, onCancel }) {
  if (!player) return null;

  const {
    playerName,
    rating,
    position,
    coinAmount,
    startPrice,
    paymentInUsd,
    currentRateInUSD,
    cardValue,
    cardAndFeeDeducted,
    transactionID,
    platform,
    customerID,
    ea_expires_at,
  } = player;

  const expiresDate =
    ea_expires_at ? new Date(ea_expires_at * 1000).toLocaleString() : null;

  return (
    <div
      style={{
        background: "#111",
        borderRadius: 16,
        padding: 16,
        border: "1px solid #333",
        maxWidth: 420,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>{playerName}</div>
        <div style={{ opacity: 0.8 }}>
          Rating {rating} · Position {position || "any"}
        </div>
        <div style={{ opacity: 0.8 }}>
          Platform {platform} · Customer {customerID}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ opacity: 0.7 }}>Start Price</div>
          <div>{startPrice}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>Buy Now Price</div>
          <div>{coinAmount}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>Payment (USD)</div>
          <div>{paymentInUsd}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>$ Rate / 10K</div>
          <div>{currentRateInUSD}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>Card Value</div>
          <div>{cardValue}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>Coins Transferred</div>
          <div>{cardAndFeeDeducted}</div>
        </div>
      </div>

      {expiresDate && (
        <div style={{ opacity: 0.7, marginBottom: 12 }}>
          EA expires: {expiresDate}
        </div>
      )}

      <div style={{ opacity: 0.7, marginBottom: 12 }}>
        Transaction ID: {transactionID}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 999,
            border: "1px solid #f44336",
            background: "transparent",
            color: "#f44336",
            fontWeight: "bold",
          }}
        >
          Cancel
        </button>

        <button
          onClick={onBought}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 999,
            background:
              "linear-gradient(90deg, #4caf50 0%, #8bc34a 50%, #cddc39 100%)",
            border: "none",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          I Bought This
        </button>
      </div>

      <div style={{ opacity: 0.7, fontSize: 12 }}>
        Buy within 5 minutes and update status before lockExpires.
      </div>
    </div>
  );
}
