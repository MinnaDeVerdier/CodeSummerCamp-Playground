import sys

#outputjson = {
        #"returned": {
        #"id": (sys.argv[0]),
        #"result": "result output text",
        #"testresultPassed": True,
        #"testresultData": "errormessage/result"
        #}
#}
#Har man mer än 1 with open sats så körs bara den första?

#open och exec taget från https://www.geeksforgeeks.org/run-one-python-script-from-another-in-python/ , metod 3
#, open("jsonoutput.txt", "w") as jsonfile
with open("pythontest.py") as inputfile, open("/usr/src/app/outputfiles/pythonoutput.txt", "w") as outputfile:
    sys.stdout = outputfile
    #sys.stederr taget från https://stackoverflow.com/questions/1956142/how-to-redirect-stderr-in-python , svar 1
    sys.stderr = open('/usr/src/app/outputfiles/pythonerror.txt', 'w')
    exec(inputfile.read())
    #.write skriver inte något till filerna
    #jsonfile.write("test text2")
    #jsonfile.write(outputjson["returned"])
    inputfile.close()
    outputfile.close()
    #jsonfile.close()

