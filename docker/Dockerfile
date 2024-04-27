#FROM continuumio/anaconda3:latest
FROM python:3.9-slim

WORKDIR /app



COPY requirements.txt .

# Install system dependencies
RUN apt-get update && apt-get install -y \
    pkg-config \
    libhdf5-dev \
    gcc \
    libc-dev \
    libblas-dev \
    liblapack-dev \
    gfortran \
    && rm -rf /var/lib/apt/lists/*


RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install tensorflow==2.13.0 --no-cache-dir
RUN pip install keras==2.13.1
RUN pip install scikit-learn==1.4.1.post1
RUN pip install flask-cors
#RUN pip install scikit-learn==1.4.1

COPY . .

EXPOSE 8050

CMD ["python", "app.py"]