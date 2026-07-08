import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header */}

      <div
        style={{
  *       padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h2 style={{ color: "#22c55e" }}>
          🌴 Adike Labour
        </h2>

        <div>
          <span style={{ marginRight: "20px" }}>
            Home
          </span>

          <span style={{ marginRight: "20px" }}>
            Services
          </span>

          <span>Contact</span>
        </div>
      </div>

      {/* Hero */}

      <div
        style*{{
          display: "flex",
    *     flexWrap: "wrap",
          j*stifyContent: "space-between",
   *      alignItems: "center",
      *   padding: "60px 40px"
        }}*      >
        <div style={{ maxW*dth: "600px" }}>
          <h1
   *        style={{
              fon*Size: "60px",
              lineHe*ght: "1.2"
            }}
        * >
            Find Arecanut
     *      <br />
            Labourers*            <span style={{ color: *#22c55e" }}>
              {" "}
 *            Instantly
            */span>
          </h1>

          *p
            style={{
           *  color: "#cbd5e1",
              *ontSize: "18px"
            }}
   *      >
            Connecting Are*anut growers and
            labou*ers in Channagiri.
          </p>
*          <div
            style={*
              marginTop: "30px",
*             display: "flex",
    *         gap: "15px"
            }*
          >
            /labour
 *            <button
              * style={{
                  backgr*und: "#22c55e",
                  *olor: "white",
                  b*rder: "none",
                  pa*ding: "15px 30px",
               *  borderRadius: "12px",
          *       cursor: "pointer"
         *      }}
              >
         *      👷 Labour Login
              </button>
            </Link>

            /owner
              <button
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  cursor: "pointer"
                }}
              >
                🏡 Owner Login
              </button>
            </Link>
          </div>
        </div>

        {/* Stats */}

        <div
          *tyle={{
            background: "#*11827",
            padding: "25px*,
            borderRadius: "20px"*
            minWidth: "350px",
  *         boxShadow:
              *0 0 30px rgba(34,197,94,.25)"
    *     }}
        >
          <h3>📊*Live Statistics</h3>

          <d*v
            style={{
           *  display: "grid",
              g*idTemplateColumns: "1fr 1fr",
    *         gap: "15px",
            * marginTop: "20px"
            }}
*         >
            <Card
     *        title="Labourers"
              value="520+"
              color="#22c55e"
            />

            <Card
              title="Owners"
              value="130+"
              color="#3b82f6"
            />

            <Card
              title="Villages"
              value="35+"
              color="#f59e0b"
            />

            <Card
              title="Jobs"
              value="85+"
              color="#8b5cf6"
            />
          </div>
        </div>
      </div>

      {/* Features */}

      <div
        s*yle={{
          padding: "40px"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          Why Adike Labour?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px"
          }}
        >
          <Feature
            icon="⚡"
            title="Fast Search"
            text="Find labourers quickly"
          />

          <Feature
            icon="📍"
            title="Nearby Workers"
            text="Channagiri local labour network"
          />

          <Feature
            icon="📱"
            title="Direct Contact"
            text="Call and WhatsApp support"
          />

          <Feature
            icon="✅"
            title="Availability Status"
            text="See who is available today"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        borderRadius: "15px"
      }}
    >
      <p>{title}</p>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      style={{
        background: "#111827",
        padding: "25px",
        borderRadius: "20px",
        border: "1px solid #374151"
      }}
    >
      <div style={{ fontSize: "40px" }}>
        {icon}
      </div>

      <h3>{title}</h3>

      <p style={{ color: "#cbd5e1" }}>
        {text}
      </p>
    </div>
  );
}
