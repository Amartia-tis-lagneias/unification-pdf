import { useState } from "react";

function MergePage() {
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
    <div className="page">
      <h1>Объединить PDF</h1>
      <input type="file" multiple onChange={handleFiles} />
      <button className="action-btn" onClick={handleSubmit} disabled={!files}>
        Объединить
      </button>
    </div>
  );
}

export default MergePage;
