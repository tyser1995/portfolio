import Header from "../components/Header";

export default function Resume() {
  const fileUrl = '/GalidoResty.pdf'; // Path to your PDF file
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <iframe
        title="GalidoResty"
        src={fileUrl}
        width="100%"
        height="750px"
        style={{ border: "none" }}
      />
    </main>
  );
}
