#!/bin/bash

cd icons/

# Iterate over all .svg files in the current directory
for file in *.svg; do
  # Extract the base name and extension
  base="${file%.svg}"
  ext=".svg"

  # Rename the file to include -symbolic before the extension
  mv "$file" "${base}-symbolic${ext}"
done
