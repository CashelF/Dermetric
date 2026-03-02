---
title: Dermetric API
emoji: 🔬
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
---

# Dermetric - Skin Lesion Classification API

REST API for skin lesion classification using EfficientNetV2S.

## Endpoint

POST `/api/ml/predict`

Send a multipart form with `file` field containing an image.

## Response

```json
{
  "prediction": {
    "AKIEC": 0.05,
    "BCC": 0.10,
    "BKL": 0.15,
    "DF": 0.02,
    "MEL": 0.08,
    "NV": 0.55,
    "VASC": 0.05
  }
}
```
