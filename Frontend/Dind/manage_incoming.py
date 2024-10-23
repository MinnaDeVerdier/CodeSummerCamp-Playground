import sys
import json
import subprocess

print('...STARTING MANAGER...')
print('argument list', sys.argv)
instructionFile = sys.argv[1]
instruction = {}

with open(instructionFile) as Jfile:
    instruction = json.load(Jfile)
    print('...LOADED INSTRUCTION...')
sessionID = instruction["sent"]["id"]

def runcontainer():
    match instruction["sent"]["language"]:
        case '1':
            print('...OPENING PYTHON CONTAINER...')
            # Sends instructionfile (installs, full code, tests) to start the correct container
            res = subprocess.run(['sh', '/usr/src/app/pythonsetup/create_python.sh', instructionFile, sessionID, "/usr/src/app/pythonsetup/run_input.py"])
            print(f"...SUBPROCESS RES... ${res}...")
        case default:
            print("...CONTAINER FAIL...language not available")

runcontainer()

print("...MANAGER END...")
