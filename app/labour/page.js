export default function LabourPage() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>👷 Labour Registration</h1>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          gap: "15px",
        }}
      >
        <input type="text" placeholder="Name" />
        <input type="tel" placeholder="Phone Number" />
        <input type="text" placeholder="Location" />

        <label>Photo</label>
        <input type="file" />

        <input
          type="text"
          placeholder="Government ID Number"
        />

        <label>Government ID Photo</label>
        <input type="file" />

        <button type="submit">
          Register Labour
        </button>
      </form>
    </div>
  );
}
