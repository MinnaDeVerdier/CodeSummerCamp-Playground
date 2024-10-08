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

for key, value in instruction.items():
    print(f"...{key}: {value}")

match instruction["sent"]["language"]:
    case 1:
        print('...OPENING CONTAINER...')
        #Writes the user input to the python file for testing
        open_pythonfile = open("pythonsetup/pythontest.py", "w")
        open_pythonfile.write(instruction["sent"]["code"])
        res = subprocess.run(['sh', '/usr/src/app/pythonsetup/create_python.sh', instruction["sent"]["code"], instruction["sent"]["id"]])
        print(f"...SUBPROCESS RES... ${res}...")
    case default:
        print("...CONTAINER FAIL...language not available")

print("...MANAGER END...")
