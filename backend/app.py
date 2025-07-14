from flask import Flask, request, send_file
from PyPDF2 import PdfMerger
import io
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app) 

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

    return send_file(
        output,
        as_attachment=True,
        download_name="merged.pdf",
        mimetype='application/pdf'
    )

@app.route('/compress', methods=['POST'])
def compress_pdf():
    file = request.files['file']
    input_path = "input.pdf"
    output_path = "compressed.pdf"
    file.save(input_path)

    subprocess.call([
        "gs",
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/screen",  # варианты: screen, ebook, printer, prepress
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        f"-sOutputFile={output_path}",
        input_path
    ])

    return send_file(output_path, as_attachment=True)

@app.route('/split', methods=['POST'])
def split_pdf():
    file = request.files['file']
    start = int(request.form.get('start', 1)) - 1  # страницы с 0
    end = int(request.form.get('end', 1))          # включительно

    from PyPDF2 import PdfReader, PdfWriter
    reader = PdfReader(file)
    writer = PdfWriter()

    for page_num in range(start, min(end, len(reader.pages))):
        writer.add_page(reader.pages[page_num])

    output = io.BytesIO()
    writer.write(output)
    output.seek(0)

    return send_file(
        output,
        as_attachment=True,
        download_name=f"split_{start+1}-{end}.pdf",
        mimetype='application/pdf'
    )

if __name__ == "__main__":
    app.run(debug=True, port=5000)
