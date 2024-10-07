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
        python3 manage_incoming.py "$file" >> /usr/src/app/logs/pyLog.log
        echo "...manager started"
    fi
    echo "...listening..."
done
echo "...LISTENER END..."
