#cd pythonSetup, om man inte kör filen i mappen redan
docker image build -t python_test_image .
#docker image ls
docker run --mount type=bind,source=/usr/src/app/codefiles,target=/usr/src/app/codefiles,readonly -it --detach --name python_container python_test_image
#docker container ps -a
docker container start python_container
docker exec -it python_container sh -c "python pythontest.py"
