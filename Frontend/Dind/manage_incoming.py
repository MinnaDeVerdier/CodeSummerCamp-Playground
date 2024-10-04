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
    print(f"...{key}: {value}\n")

match instruction["sent"]["language"]:
    case 1:
        print('...OPENING CONTAINER...')
        subprocess.run(['sh', '/usr/src/app/pythonSetup/create_python.sh'])
    case default:
        print("...CONTAINER FAIL...language not available")

print("...MANAGER END...")

   #sh /usr/src/app/pythonSetup/create_python.sh "$directory" "$event" "$file"