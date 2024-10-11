#taget från https://www.geeksforgeeks.org/ways-to-save-python-terminal-output-to-a-text-file/
import sys
import json
#taget från https://www.geeksforgeeks.org/run-one-python-script-from-another-in-python/

#taget från https://www.quora.com/How-do-I-save-a-shell-output-to-a-file-in-Python , svar1
import subprocess 
 
# Define the command you want to run 
command =["python", "pythontest.py"]  # Example command; change it to your desired command 
 
# Open a file in write mode 
with open('pythonoutput.txt', 'w') as output_file: 
    # Run the command and redirect output to the file 
    output = subprocess.run(command, encoding="UTF8", text=True, capture_output=True)
    variable = str(output)
    print(f"...OUTPUT.. ${output}...")
    #res_obj = json.dumps(output.stdout)
    output_file.write(variable)
    #res = subprocess.run(['sh', '/usr/src/app/pythonsetup/create_python.sh', instruction["sent"]["code"], instruction["sent"]["id"]])
    #output_file.write("ertertreterte")
    #output_file.write(output)

#with open("pythonoutput.txt", "w") as file2:
    #with open("pythontest.py") as file:
        #sys.stdout = file2
        #sys.stderr = file2
        #exec(file.read())
        #subprocess.run(["python", "pythontest.py"])
    #file2.write("djfghdfjkghfdhj")
    


#with open("pythontest.py") as file, open("pythonoutput.txt", "a") as file2:
    #exec(file.read())
    #sys.stdout.write = file2
    #sys.stderr.write = file2


#with open ("pythonoutput.txt", "w") as textfile:
    #textfile.write("test")