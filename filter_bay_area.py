#!/usr/bin/env python3
"""
Filter a CSV file to only include rows within the California Bay Area.
Uses a bounding box for speed.

Usage: python filter_bay_area.py <input_file> [output_file]
"""

import sys
import csv

# Tight bounding box around the 9-county Bay Area
# (San Francisco, San Mateo, Santa Clara, Alameda, Contra Costa,
#  Marin, Sonoma, Napa, Solano)
BAY_AREA_BBOX = {
    "lat_min": 36.893,
    "lat_max": 38.864,
    "lon_min": -123.633,
    "lon_max": -121.208,
}


def in_bay_area(lat, lon):
    return (
        BAY_AREA_BBOX["lat_min"] <= lat <= BAY_AREA_BBOX["lat_max"]
        and BAY_AREA_BBOX["lon_min"] <= lon <= BAY_AREA_BBOX["lon_max"]
    )


def filter_bay_area(input_path, output_path):
    rows_read = 0
    rows_written = 0
    rows_skipped_parse = 0

    with open(input_path, newline="", encoding="utf-8") as infile, \
         open(output_path, "w", newline="", encoding="utf-8") as outfile:

        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)
        writer.writeheader()

        for row in reader:
            rows_read += 1
            try:
                lat = float(row["latitude"])
                lon = float(row["longitude"])
            except (ValueError, KeyError):
                rows_skipped_parse += 1
                continue

            if in_bay_area(lat, lon):
                writer.writerow(row)
                rows_written += 1

    print(f"Done.")
    print(f"  Read:    {rows_read:,} rows")
    print(f"  Written: {rows_written:,} Bay Area rows → {output_path}")
    if rows_skipped_parse:
        print(f"  Skipped: {rows_skipped_parse:,} rows with unparseable coordinates")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python filter_bay_area.py <input_file> [output_file]")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = (
        sys.argv[2]
        if len(sys.argv) > 2
        else input_file.replace(".csv", "_bay_area.csv")
    )

    filter_bay_area(input_file, output_file)
