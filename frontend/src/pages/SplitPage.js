import { useState } from "react";

function SplitPage() {
  const [file, setFile] = useState(null);
  const [range, setRange] = useState({ start: 1, end: 1 });

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSplit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("start", range.start);
    formData.append("end", range.end);

    const res = await fetch("http://localhost:5000/split", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `split_${range.start}-${range.end}.pdf`;
    a.click();
  };

  return (
    <div className="page">
      <h1>Разделить PDF</h1>
      <input type="file" onChange={handleFile} />
      <div>
        <label>
          с:
          <input
            type="number"
            min="1"
            value={range.start}
            onChange={(e) => setRange({ ...range, start: e.target.value })}
          />
        </label>
        <label>
          по:
          <input
            type="number"
            min="1"
            value={range.end}
            onChange={(e) => setRange({ ...range, end: e.target.value })}
          />
        </label>
      </div>
      <button className="action-btn" onClick={handleSplit} disabled={!file}>
        Разделить
      </button>
    </div>
  );
}

export default SplitPage;
