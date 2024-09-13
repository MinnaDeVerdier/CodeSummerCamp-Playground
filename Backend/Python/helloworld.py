# Assignment
print("write code that gives  the output: \"Hello World\"")
ans = input()

# Save user code attempt
with open('Attempts/helloworld.py',"w") as attemptFile:
    attemptFile.write(ans)

# Run control on attempt
import Control.helloworld as test
if test.control_code():
    print("Success!")
else:
    print("Fail")
    
# clear attempt-code
with open('Attempts/helloworld.py',"w") as ansFile:
    ansFile.write('')