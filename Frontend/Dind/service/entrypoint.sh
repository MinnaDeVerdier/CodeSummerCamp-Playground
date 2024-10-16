#!/bin/sh
set -e

# UNCOMMENT to run cleaner on docker container start
#sh /usr/src/app/service/cleaner.sh >> /usr/src/app/logs/cleaningLog.log 2>&1 &

echo "...STARTING DOCKERD..."
# Start the Docker daemon in the background
/usr/local/bin/dockerd-entrypoint.sh dockerd &

# Wait for the Docker daemon to become available. Redirects output to appended logs, and "2>&1" writes errors to same as output
# start_attempts=0
# while [ $start_attempts -lt 90 ]; do
while [ ! -S /var/run/docker.sock ] >> /usr/src/app/logs/createDockerLog.log 2>&1 ; do
    echo "...WAITING for Docker daemon to start..."
    start_attempts=$((start_attempts + 1))
    sleep 1
done
# done

# Runs listener-script to start watching shared folder
echo "...OPENING LISTENER..."
sh /usr/src/app/service/listener.sh

echo "...ENTRYPOINT END..."
