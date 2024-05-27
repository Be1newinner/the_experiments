import fitz  # PyMuPDF for PDF handling
from tkinter import filedialog, Tk
import os

def extract_images_from_pdf(pdf_path, output_folder):
    # Open the PDF file
    pdf_document = fitz.open(pdf_path)

    # Create the output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Iterate through each page in the PDF
    for page_number in range(pdf_document.page_count):
        page = pdf_document.load_page(page_number)
        images = page.get_images(full=True)

        for img_index, img_info in enumerate(images):
            xref = img_info[0]
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]

            # Save the image as PNG
            image_path = os.path.join(output_folder, f"page{page_number + 1}_img{img_index + 1}.png")
            with open(image_path, "wb") as image_file:
                image_file.write(image_bytes)

    pdf_document.close()
    print("Images extracted from PDF.")

if __name__ == "__main__":
    Tk().withdraw()  # Hide the main window

    # Ask for the PDF file location
    pdf_file = filedialog.askopenfilename(title="Select PDF File", filetypes=[("PDF Files", "*.pdf")])

    # Ask where to save the images
    images_output_folder = filedialog.askdirectory(title="Select Output Folder for Images")

    # Create the output folder if it doesn't exist
    os.makedirs(images_output_folder, exist_ok=True)

    # Extract images from the PDF
    extract_images_from_pdf(pdf_file, images_output_folder)

    print("Images extracted from PDF.")
