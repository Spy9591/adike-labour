import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#22c55e" }}>
        🌴 Adike Labour
      </h1>

      <h2>
        Find Arecanut Labourers in Channagiri
      </h2>

      <p>
        Connecting labourers and farm owners.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
        }}
      >
        /labour
          <button
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            👷 Labour
          </button>
        </Link>

        /owner
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            🏡 Owner
          </button>
        </Link>
      </div>
    </div>
  );
}
