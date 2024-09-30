FROM python
WORKDIR /usr/src/app-backend-python
COPY requirements.txt ./
RUN /bin/sh -c pip install --no-cache-dir -r requirements.txt
COPY . .