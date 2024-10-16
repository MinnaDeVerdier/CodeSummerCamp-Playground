set -euo pipefail

instructionfile="$1"
id="$2"
runfile="$3"

echo "CREATE_PYTHON.SH instructionfile: $instructionfile id: $id Runfile: $runfile"

# Check if image exists, else build. Redirects output to null, to remove unneccessary logs
if docker image inspect python_test_image >/dev/null;  then
    echo "...using existing image..."
    docker image ls
else
    echo "...building new image..."
    docker image build -t python_test_image /usr/src/app/pythonsetup
fi

# Check if the container already exists, if not, create it. Redirects output to null, to remove unneccessary logs
if docker container inspect "python_$id" >/dev/null; then
    echo "...existing container..."
    docker container start "python_$id"
else
    echo "... creating container..."
    # changed to pythonfiles in target, same as in source (easier to find)
    # tror vi kan ta bort flera av dessa mounts eftersom vi skickar in filerna som argument när scripten körs
    docker run --mount type=bind,source=/usr/src/app/codefiles,target=/usr/src/app/codefiles,readonly --mount type=bind,source=/usr/src/app/pythonsetup,target=/usr/src/app/pythonsetup --mount type=bind,source=/usr/src/app/outputfiles,target=/usr/src/app/outputfiles -it --detach --name "python_$id" python_test_image
fi
docker container ps -a

# Runs code modifications and tests from instructionfile directly in child container
docker exec python_$id sh -c "python $runfile $instructionfile $id" >>/usr/src/app/logs/createpyLog.log 2>>/usr/src/app/logs/createpyLog.log

exit $?