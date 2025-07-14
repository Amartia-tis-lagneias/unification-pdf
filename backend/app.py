from flask import Flask, request, send_file
from PyPDF2 import PdfMerger
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # разрешаем запросы от React

@app.route('/merge', methods=['POST'])
def merge_pdfs():
    files = request.files.getlist("files")
    merger = PdfMerger()
    for file in files:
        merger.append(file)

    output = io.BytesIO()
    merger.write(output)
    merger.close()
    output.seek(0)

    return send_file(output, as_attachment=True, download_name="merged.pdf", mimetype='application/pdf')

if __name__ == "__main__":
    app.run(debug=True, port=5000)
