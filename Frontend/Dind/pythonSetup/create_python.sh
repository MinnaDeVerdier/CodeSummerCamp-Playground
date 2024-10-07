printf "create_py_args ...1: $1 ...2: $2 ...3: $3"
#cd pythonsetup, om man inte kör filen i mappen redan
#printf "$1 , test to check the input in shell here" it was there
docker image build -t python_test_image /usr/src/app/pythonsetup
echo $1 > /usr/src/app/pythonsetup/pythontest.py
echo $1 > /usr/src/app/pythonsetup/pythonText.txt
#docker image ls
docker run --mount type=bind,source=/usr/src/app/codefiles,target=/usr/src/app/codefiles,readonly --mount type=bind,source=/usr/src/app/pythonsetup,target=/usr/src/app/ -it --detach --name python_container python_test_image
#docker run --mount type=bind,source=/usr/src/app/pythonsetup,target=/usr/src/app/ -it --detach --name python_container2 python_test_image
#docker container ps -a
docker container start python_container
#Byt ut testfilen med ett nytt program som gör test av input
docker exec python_container sh -c "python pythontest.py"
