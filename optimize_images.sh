#!/bin/bash

# Optimize Logo
# Original 1024x1024 -> Resize to 256x256
sips -Z 256 assets/logo.png

# Optimize Hero Images
# Convert the massive PNG to JPG and resize
sips -s format jpeg -s formatOptions 80 -Z 1600 assets/IMG_0761.png --out assets/IMG_0761.jpg

# Resize existing JPGs in place
sips -Z 1600 -s formatOptions 80 assets/0C0A7430.jpeg
sips -Z 1600 -s formatOptions 80 assets/1000053378.jpg
sips -Z 1600 -s formatOptions 80 assets/IMG_9457.JPG

# Optimize Project Images (in place)
# Resize to 800px width
find assets/selected-work -name "*.png" -exec sips -Z 800 {} \;

# Optimize Certifications (in place)
# Resize to 600px width
find assets/certifications -name "*.png" -exec sips -Z 600 {} \;

echo "Optimization complete."
