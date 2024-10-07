#!/bin/sh
set -e

echo "...STARTING DOCKERD..."
# Start the Docker daemon in the background
/usr/local/bin/dockerd-entrypoint.sh dockerd &

# Wait for the Docker daemon to start. Redirects output to logs, and "2>1" writes errors to same as output
while ! docker info >>/usr/src/app/logs/createDockerLog.log 2>&1; do
    echo "...WAITING for Docker daemon to start..."
    sleep 1
done

echo "...OPENING LISTENER..."

# Runs listener-script to start watching shared folder
sh /usr/src/app/listener.sh

echo "...ENTRYPOINT END..."
