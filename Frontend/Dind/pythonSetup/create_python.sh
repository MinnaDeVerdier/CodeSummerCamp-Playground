code="$1"
id="$2"
echo "SHORTCUTS code: $code id: $id"

# Check if image exists, else build. Redirects output to null, to remove unneccessary logs
if docker image inspect python_test_image >/dev/null;  then
    echo "...using existing image..."
    docker image ls
else
    echo "...building new iamge..."
    docker image build -t python_test_image /usr/src/app/pythonSetup
fi

# Check if the container already exists, if not, create it. Redirects output to null, to remove unneccessary logs
if docker container inspect "python_$id" >/dev/null; then
    echo "...existing container..."
    docker container start "python_$id"
else
    echo "... creating container..."
    docker run --mount type=bind,source=/usr/src/app/codefiles,target=/usr/src/app/codefiles,readonly --detach -it --name "python_$id" python_test_image
fi
docker container ps -a
docker exec "python_$id" python3 -c "$code"
#docker container rm -f python_container
