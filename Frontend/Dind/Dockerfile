FROM docker:latest

WORKDIR /usr/src/app
EXPOSE 3002

RUN apk add --no-cache inotify-tools
RUN apk add --no-cache python3 
#py3-pip
ENV NODE_ENV=dev

COPY . .
# Starts listening for file changes on container start

COPY service/entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
# Use the entrypoint script
ENTRYPOINT ["entrypoint.sh"]
