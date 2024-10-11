code="$1"
id="$2"
echo "SHORTCUTS code: $code id: $id"
echo "$1 : "

# Check if image exists, else build. Redirects output to null, to remove unneccessary logs
if docker image inspect python_test_image >/dev/null;  then
    echo "...using existing image..."
    docker image ls
else
    echo "...building new image..."
    docker image build -t python_test_image /usr/src/app/pythonsetup
#    docker image build -t python_test_image /usr/src/app/pythonsetup
fi

# Save code to python-file
#echo $code > /usr/src/app/pythonsetup/pythontest.py
#echo $code > /usr/src/app/pythonsetup/pythonText.txt

# Check if the container already exists, if not, create it. Redirects output to null, to remove unneccessary logs
if docker container inspect "python_$id" >/dev/null; then
    echo "...existing container..."
    docker container start "python_$id"
else
    echo "... creating container..."
    docker run --mount type=bind,source=/usr/src/app/codefiles,target=/usr/src/app/codefiles,readonly --mount type=bind,source=/usr/src/app/pythonsetup,target=/usr/src/app -it --detach --name "python_$id" python_test_image
fi
docker container ps -a

#Kör användarens python-kod som ligger i pythontest.py. 
#CTRLV in i dind container och kör kommandot så skrivs pythonfilens output till textfilen, men det funkar inte genom sh?
#testoutput.txt blir alltid tom efter att man kör create_python.sh
docker exec python_$id sh -c "python runinput.py"

#docker exec "python_$id" python3 -c "$code"
#docker container rm -f python_container
