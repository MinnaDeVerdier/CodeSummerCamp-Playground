import io
import sys

def control_code():
# Create a StringIO buffer and redirect output
    buffer = io.StringIO()
    sys.stdout = buffer
# Run code attempt here
    with open('Attempts/helloworld.py',"r") as attemptFile:
        exec(attemptFile.read())
    
# Reset output to console
    sys.stdout = sys.__stdout__

# Check output, without final line break
    output = buffer.getvalue().removesuffix('\n')
    buffer.close()

    if output == str('Hello World'): return True
    else:
        print(output, len(output)) 
        return False