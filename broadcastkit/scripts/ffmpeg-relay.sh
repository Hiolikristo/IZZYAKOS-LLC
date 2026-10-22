#!/usr/bin/env bash
set -euo pipefail
: "${INPUT_URL:?Set INPUT_URL}"
: "${OUTPUT_1:?Set OUTPUT_1}"
outs=("[f=flv]$OUTPUT_1")
[[ -n "${OUTPUT_2:-}" ]] && outs+=("[f=flv]$OUTPUT_2")
[[ -n "${OUTPUT_3:-}" ]] && outs+=("[f=flv]$OUTPUT_3")
tee_url=$(IFS='|'; echo "${outs[*]}")
ffmpeg -hide_banner -loglevel warning -re -i "$INPUT_URL" -c:v libx264 -preset veryfast -tune zerolatency -pix_fmt yuv420p -g 60 -keyint_min 60 -c:a aac -b:a 128k -ar 48000 -ac 2 -f tee "$tee_url"
