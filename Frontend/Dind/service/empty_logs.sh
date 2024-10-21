#!/bin/sh
set -e

templog=","

for logfile in /usr/src/app/logs/*.log ; do
    echo "file $logfile"
    head -n 1 "$logfile" > "$templog"
    echo "emptied $logfile"
    rm $templog
done
echo "$(date +%T)...CLEARING LOGS DONE..."

exit 0