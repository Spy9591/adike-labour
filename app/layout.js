export const metadata = {
  title: "ಅಡಿಕೆ ಕಾರ್ಮಿಕ",
  description: "ಅಡಿಕೆ ಕಾರ್ಮಿಕ ವೇದಿಕೆ"
};

export default function RootLayout({ children }) {
  return (
    <html lang="kn">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif"
        }}
      >
        {children}
      </body>
    </html>
  );
}
