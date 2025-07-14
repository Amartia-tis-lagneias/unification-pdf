import { useState } from "react";

function CompressPage() {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCompress = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/compress", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed.pdf";
    a.click();
  };

  return (
    <div className="page">
      <h1>Сжать PDF</h1>
      <input type="file" onChange={handleFile} />
      <button className="action-btn" onClick={handleCompress} disabled={!file}>
        Сжать
      </button>
    </div>
  );
}

export default CompressPage;
