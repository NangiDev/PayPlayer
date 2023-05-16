#!/bin/bash

output_file="Index.txt"
current_dir=$(dirname "$0")

# Remove the output file if it already exists
if [ -f "$current_dir/$output_file" ]; then
  rm "$current_dir/$output_file"
fi

# Iterate through files in the current directory
for file in "$current_dir"/*.txt; do
  if [ "$file" != "$current_dir/$output_file" ]; then
    filename=$(basename -- "$file")
    filename="${filename%.*}"
    echo "$filename" >> "$current_dir/$output_file"
  fi
done