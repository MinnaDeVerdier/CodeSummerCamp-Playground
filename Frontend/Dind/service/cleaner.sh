#!/bin/sh
set -e

# Remove inactive containers, images, and networks, and anon+inactive volumes.
clean() {
    echo "$(date +%T)...CLEANING"
    docker system prune -f --volumes
    echo "$(date +%T)...removing codefiles..."
    rm -f /usr/src/app/codefiles/*
    echo "$(date +%T)...DONE"
}

# Stop and remove all containers, images, anon+inactive volumes and networks.
clean_all() {
    echo "...CLEANING ALL"
    if ! docker ps -q >/dev/null 2>&1 ; then
        echo "$(date +%T)...killing child containers..."
        docker kill "$(docker ps -q)"
    fi
    echo "$(date +%T)....removing..."
    docker system prune -a -f --volumes
    echo "$(date +%T)...removing codefiles..."
    rm -f /usr/src/app/codefiles/*
    echo "$(date +%T)...DONE"

}

echo "$(date +%T)...STARTING CLEANER..."
clean

# Container uses timezone UTC+0, no daylight savings. Function set to clean at 23:30 in container will run at 01:30 local (UTC+1) summer time, 00:30 local winter time
STARTING_TIME="$(date +'%H%M')"
#echo "...STARTING_TIME $STARTING_TIME..."

CLEANING_TIME="2330"
#echo "...CLEANING_TIME $CLEANING_TIME..."

if [ $STARTING_TIME -ge $CLEANING_TIME ] ; then
    COUNTDOWN=$(expr $STARTING_TIME - $CLEANING_TIME)
else
    COUNTDOWN=$(expr $CLEANING_TIME - $STARTING_TIME)
fi

# Sleeps until cleaning_time, then sleeps 24 hours between cleanings
while true ; do
    minutes=${COUNTDOWN:2:2}  # Extract last two digits for min
    hours=${COUNTDOWN:0:2}    # Extract first two digits for h
    echo "SLEEPING FOR h$hours m$minutes..."

    # Convert hours to seconds and add minutes converted to seconds
    total_seconds=$((hours * 3600 + minutes * 60))
    sleep $total_seconds
    
    #sh empty_logs.sh
    clean_all
    # Countdown 24 hours to next clean
    COUNTDOWN="2400"
done
