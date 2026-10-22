# BroadcastKit background/matting engine

Default browser path: MediaPipe Image Segmenter (`selfie_segmenter` / `selfie_multiclass`) using an Apache-2.0 model/runtime. Run video segmentation off the main UI path where practical, apply temporal smoothing to the confidence mask, refine edges, suppress color spill, then composite against a real or virtual set whose exposure/color temperature matches the speaker.

Do not solve bad capture with stronger blur. Use capture readiness first: face exposure, backlight warning, camera framing, background distance, mic level/noise floor.

Optional high-end backend: Robust Video Matting or another ONNX/TensorRT model as a separately licensed worker. RVM is GPL-3.0; if distributed with the product, satisfy its license obligations. Keep the default commercial-friendly path on MediaPipe/Apache-2.0 unless legal review approves another distribution model.

Pipeline:
1. Camera/guest frame
2. Face-aware exposure / white-balance analysis
3. Person segmentation confidence mask
4. Morphological cleanup + temporal smoothing
5. Edge feather / hair protection
6. Background color-temperature and grain matching
7. Foreground local contrast / skin-tone protection
8. Composite
9. Encode + audio processing
10. Preview and per-destination health check