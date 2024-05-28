from PIL import Image
from tkinter import filedialog, Tk
import os

def compress_image(input_path, output_path, quality=80):
    try:
        with Image.open(input_path) as img:
            # Determine the image format
            image_format = img.format.lower()  # Convert to lowercase for consistency

            # Save the image in the appropriate format with specified quality
            img.save(output_path, image_format, quality=quality, lossless=True)
            print(f"Image successfully compressed and saved at: {output_path}")
    except Exception as e:
        print(f"Failed to compress image: {e}")

if __name__ == "__main__":
    Tk().withdraw()  # Hide the main window

    # Ask for the input image file location using a file dialog
    input_image_path = filedialog.askopenfilename(title="Select Input Image", filetypes=[("Image Files", "*.png;*.jpg;*.jpeg;*.bmp;*.gif;*.tiff")])

    if not input_image_path:
        print("No input image selected. Exiting.")
        exit()

    # Ask where to save the compressed image using a file dialog
    output_image_path = filedialog.asksaveasfilename(title="Save Compressed Image", filetypes=[("PNG", "*.png"), ("JPEG", "*.jpg"), ("All Files", "*.*")])

    if not output_image_path:
        print("No output location selected. Exiting.")
        exit()

    # Determine the output image format based on the input image extension
    _, input_image_extension = os.path.splitext(input_image_path)
    output_image_path += input_image_extension  # Append the same extension

    # Compress the image
    compress_image(input_image_path, output_image_path)

    print("Image compression completed.")
