from PIL import Image
from tkinter import filedialog
import os

def resize_webp(input_path, output_path, new_width, aspect_ratio=True):
    with Image.open(input_path) as img:
        if aspect_ratio:
            # Calculate the proportional height to maintain aspect ratio
            height = int((new_width / float(img.size[0])) * img.size[1])
            resized_img = img.resize((new_width, height))
        else:
            resized_img = img.resize((new_width, new_width))

        resized_img.save(output_path, "WebP")

if __name__ == "__main__":
    # Ask for the input folder containing WebP files
    input_folder = filedialog.askdirectory(title="Select Input Folder")

    # Ask where to save all new files
    output_folder = filedialog.askdirectory(title="Select Output Folder")

    # Ask for the desired width
    new_width = int(input("Enter the desired width for the WebP images: "))

    # Iterate through the WebP files in the input folder
    for file_name in os.listdir(input_folder):
        if file_name.endswith(".webp"):
            input_path = os.path.join(input_folder, file_name)
            output_path = os.path.join(output_folder, f"resized_{file_name}")
            resize_webp(input_path, output_path, new_width)
            print(f"Resized {file_name} and saved to {output_path}")
