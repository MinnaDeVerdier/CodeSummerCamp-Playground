import json
import sys
import subprocess

def runTest(test, code):
    try:
        # Should the subprocess-line be 
            # os.system("python pythontest.py" + " > /usr/src/app/outputfiles/pythonoutput.txt")
            # os.system("python pythontest.py" + " 1> /usr/src/app/outputfiles/pythonoutput.txt")
            # os.system("python pythontest.py" + " 2> /usr/src/app/outputfiles/pythonerror.txt")
        # instead?
        res = subprocess.run('python', stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True, check=False, timeout=18, encoding='utf-8', input=code)
        # Writes all outpur and errors together, uncomment two lines and change stderr to PIPE to make separate files
        # result.append("Output:\n    " + res.stdout + "\n")
        # result.append("Error:\n    " + res.stderr + "\n")
    #     result['return_value'] = local_vars.get('__return__')
        result=res.stdout
    except Exception as e:
        result=result+"EXception runinput.py subprocess:\n    " + str(e) + "\n"
    # Write result/output of all tests to file based on user session
    with open(f"/usr/src/app/outputfiles/{sessionID}_test.txt", "a") as outputfile:
        outputfile.write(f"{test}:\n    {result}")
    print("--Result--:", res)

def buildPythonTests():
    codeToRun={}
    # Writes the recieved code as string
    codestring = "\n".join(instruction["sent"]["code"])
    # Create dict for each test, with code and test combined in runnable string. Could be redundant if subprocess input can stay open and accept diferent tests
    for test in instruction["sent"]["testCode"]:
        teststring = '\n'.join(instruction["sent"]["testCode"][test])
        fullstring = codestring + "\n" + teststring
        codeToRun[test]=fullstring
    return codeToRun

print("----runinput.py----")
print("args: ", sys.argv)
instructionFile = sys.argv[1]
sessionID = sys.argv[2]

with open(instructionFile) as Jfile:
    instruction = json.load(Jfile)

# Empties earlier tries
with open(f"/usr/src/app/outputfiles/{sessionID}_test.txt", "w") as outputfile:
    outputfile.flush()

codeToRun = buildPythonTests()
for item in codeToRun:
    runTest(item, codeToRun[item])
