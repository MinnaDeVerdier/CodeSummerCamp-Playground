printf "create_py_args ...1: $1 ...2: $2 ...3: $3"
#cd pythonSetup, om man inte kör filen i mappen redan
docker image build -t python_test_image /usr/src/app/pythonSetup
#docker image ls
docker run --mount type=bind,source=/usr/src/app/codefiles,target=/usr/src/app/codefiles,readonly -it --detach --name python_container python_test_image
#docker container ps -a
docker container start python_container
docker exec python_container sh -c "python pythontest.py"
