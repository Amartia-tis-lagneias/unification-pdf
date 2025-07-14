from flask import Flask, request, send_file
from flask_cors import CORS
from PyPDF2 import PdfMerger
import io
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return 

@app.route("/merge", methods=["POST"])
def merge_pdfs():
    files = request.files.getlist("files")
    merger = PdfMerger()
    for file in files:
        merger.append(file)

    output = io.BytesIO()
    merger.write(output)
    merger.close()
    output.seek(0)

    return send_file(output, as_attachment=True, download_name="merged.pdf", mimetype="application/pdf")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
