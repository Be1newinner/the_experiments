import fitz  # PyMuPDF for PDF handling
from tkinter import filedialog, Tk
import os

def convert_pdf_to_images(pdf_path, output_folder):
    # Open the PDF file
    pdf_document = fitz.open(pdf_path)

    # Iterate through each page in the PDF
    for page_number in range(pdf_document.page_count):
        page = pdf_document.load_page(page_number)

        # Convert the page to an image with high resolution and anti-aliasing
        image = page.get_pixmap(matrix=fitz.Matrix(300/72, 300/72), alpha=False)

        # Save the image as PNG
        image_path = os.path.join(output_folder, f"page_{page_number + 1}.png")
        image.save(image_path)

    pdf_document.close()
    print("PDF pages successfully converted to images.")

if __name__ == "__main__":
    Tk().withdraw()  # Hide the main window

    # Ask for the PDF file location
    pdf_file = filedialog.askopenfilename(title="Select PDF File", filetypes=[("PDF Files", "*.pdf")])

    # Ask where to save the images
    images_output_folder = filedialog.askdirectory(title="Select Output Folder for Images")

    # Create the output folder if it doesn't exist
    os.makedirs(images_output_folder, exist_ok=True)

    # Convert PDF to images
    convert_pdf_to_images(pdf_file, images_output_folder)

    print("Process completed. PDF pages successfully converted to images.")
