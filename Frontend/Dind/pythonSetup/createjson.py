import json

outputjson = {
        #"returned": {
            "id": "(sys.argv[0])",
            "output": "sys.stdout",
            "error": "sys.stderr"
        #}
}

def writeJson():
    with open("/usr/src/app/outputfiles/pythonjson.json", "w") as jsonFile:
        #https://www.geeksforgeeks.org/reading-and-writing-json-to-a-file-in-python/ json.dump taget från andra exemplet
        outputjson["output"] = "rtytrytry"
        outputjson["error"] = "yuiyuiyui"
        json.dump(outputjson, jsonFile)

writeJson()