#!/bin/sh

echo "...STARTING LISTENER..."
inotifywait -mr -e close_write /usr/src/app/codefiles/ | while read -r directory event filename
do
    echo "...Directory: $directory"
    echo "...Event: $event"
    echo "...Filename: $filename"
    file="$directory$filename"
    if [ -f "$file" ]; then
        echo "...OPENING MANAGER..."
        # Starts manager and redirects output to logs
        python3 /usr/src/app/manage_incoming.py "$file" >> /usr/src/app/logs/pyLog.log 2>&1
        echo "...manager started"
    fi
    echo "...listening..."
done
echo "...LISTENER END..."
