import Attempts.addition as attempt
def control_code():
    a=3
    b=4
    if attempt.Add(a,b) == 7:
        return True
    else: 
        return False