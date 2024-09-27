message = "Test message from python file!"
print(message)


#https://www.w3schools.com/python/ref_file_readlines.asp 
file1 = open("recievedText.txt", "r")
print(file1.readline())
file1.close()

#https://www.w3schools.com/python/ref_file_writelines.asp
file2 = open("testTextPython.txt", "w")
file2.writelines(["ny text här"])
file2.close()

file3 = open("testTextPython.txt", "r")
#print(file3.readlines())
file3.close()