#!/usr/bin/env bash
set -euo pipefail
: "${INPUT_URL:?Set INPUT_URL}"
: "${OUTPUT_URL:?Set OUTPUT_URL}"
ffmpeg -hide_banner -loglevel warning -i "$INPUT_URL" -vf "hqdn3d=1.5:1.5:6:6,eq=contrast=1.03:saturation=1.03:brightness=0.01,scale='min(1920,iw)':-2,format=yuv420p" -af "highpass=f=80,afftdn=nf=-35,acompressor=threshold=-18dB:ratio=2.5:attack=20:release=180,loudnorm=I=-16:TP=-1.0:LRA=7" -c:v libx264 -preset veryfast -profile:v high -g 60 -keyint_min 60 -c:a aac -b:a 128k -ar 48000 -ac 2 -f flv "$OUTPUT_URL"
