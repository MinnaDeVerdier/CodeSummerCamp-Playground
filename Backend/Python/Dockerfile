FROM python
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN /bin/sh -c pip install --no-cache-dir -r requirements.txt
COPY . .
CMD tail -f /dev/null