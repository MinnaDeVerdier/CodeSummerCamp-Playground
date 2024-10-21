#!/bin/sh
set -e

start_dockerd() {
    /usr/local/bin/dockerd-entrypoint.sh dockerd >> /usr/src/app/logs/createDockerLog.log 2>&1 &
    # Wait for the Docker daemon to become available. 
    start_attempt_seconds=70
    while [ $start_attempt_seconds -ge 0 ] ; do
        if [ -S /var/run/docker.sock ] ; then
            if docker info >/dev/null 2>&1; then
                echo "Docker daemon is ready"
                return 0
            fi
        fi
        echo "...WAITING for Docker daemon to start..."
        start_attempt_seconds=$((start_attempt_seconds - 5))
        echo "WITH $start_attempt_seconds LEFT"
        sleep 5
    done
    return 1
}

# Redirects output to appended logs, and "2>&1" writes errors to same as output
# Clear logs before docker start
sh /usr/src/app/service/empty_logs.sh >> /usr/src/app/logs/cleaningLog.log 2>&1

# Start the Docker daemon with three attempts
i=1
running=1
until [ $running -eq 0 ] ; do
    echo "...STARTING DOCKERD, ATTEMPT $i of 3"
    start_dockerd
    running=$?
    if [ $running -eq 1 ] ; then
        echo "Timeout: Docker daemon did not start within the allocated time"
        i=$(($i + 1))
    fi

    if [ $i -eq 4 ] ; then
        echo "Failed to start Docker after 3 attempts"
        exit 3
    fi
done

# Clean old containers etc on start and every night at set time, "&" to keep running in the background
sh /usr/src/app/service/cleaner.sh >> /usr/src/app/logs/cleaningLog.log 2>&1 &

# Runs listener-script to start watching shared folder
echo "...OPENING LISTENER..."
sh /usr/src/app/service/listener.sh

echo "...ENTRYPOINT END..."
