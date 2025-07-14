import { useState } from "react";
import "./App.css";

function App() {
  const [files, setFiles] = useState(null);

  const handleFiles = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    const res = await fetch("http://localhost:5000/merge", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "merged.pdf";
    a.click();
  };

  return (
    <div className="app">
      <h1>Объединение PDF</h1>
      <div className="upload-area">
        <input type="file" multiple onChange={handleFiles} />
      </div>
      <button className="merge-btn" onClick={handleSubmit}>
        Объединить
      </button>
    </div>
  );
}

export default App;
