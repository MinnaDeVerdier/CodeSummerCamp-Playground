#!/bin/sh

echo "...STARTING LISTENER..."
inotifywait -mr -e close_write /usr/src/app/codefiles/ | while read -r directory event filename
do
    echo "...Directory: $directory"
    echo "...Event: $event"
    echo "...Filename: $filename"
    file="$directory$filename"
    if [ -f "$file" ]; then
        echo "...Reading contents of the new file:"
        #cat "$file"
        echo "...OPENING MANAGER..."
        python3 manage_incoming.py "$file"
        echo "...manager started"
    fi
    echo "...listening..."
done
echo "...LISTENER END..."