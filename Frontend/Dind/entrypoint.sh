#!/bin/sh
set -e

echo "...STARTING DOCKERD..."
# Start the Docker daemon in the background
/usr/local/bin/dockerd-entrypoint.sh dockerd &

# Wait for the Docker daemon to start BROKEN???
# while ! docker info >/dev/null 2>&1; do
echo "...WAITING for Docker daemon to start...\n"
sleep 10
#done

echo "...OPENING LISTENER..."
# Run your custom script
sh /usr/src/app/listener.sh
echo "...ENTRYPOINT END..."