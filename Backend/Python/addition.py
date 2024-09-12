
# retrieve base code from file and show user
base = []
with open('Base/addition.txt',"r") as baseFile:
    base = baseFile.readlines()

print("Read through this code:\n".upper())
for line in base:
    print(line, end='')
print('\n')

print("write the missing code to make the function return x + y\nremember to use the correct amount of spaces".upper())
print("Enter multiple lines of text (type 'END' to finish):".upper())

# user enters code lines until typing END
lines = []
while True:
    line = input()   
    if line == "END":  
        break
    line = line+'\r'
    lines.append(line)
print()

# save index for line to enter user code at, and remove instruction line
for line in base:
    if line.__contains__('#'):
        missing_line = base.index(line)
        break
base.pop(missing_line)

# insert code attempt in base code at index
code=base
lines.reverse()
for line in lines:
    code.insert(missing_line, line)

with open('Attempts/addition.py',"w") as ansFile:
    ansFile.writelines(code)

# call control to test code attempt
import Control.addition as test
if test.control_code():

    print("Success!")
else:
    print("Fail")    

# clear attempt-code
with open('Attempts/addition.py',"w") as ansFile:
    ansFile.write('')