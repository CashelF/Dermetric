FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir \
    tensorflow-cpu==2.15.0 \
    Flask==3.0.0 \
    Flask-Cors==4.0.0 \
    huggingface_hub==0.20.3 \
    Pillow==10.1.0 \
    numpy==1.26.2

COPY backend/app ./app
COPY backend/run.py .

EXPOSE 7860

CMD ["python", "run.py"]
