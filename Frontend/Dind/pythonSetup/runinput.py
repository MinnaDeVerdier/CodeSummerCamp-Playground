import os
def executeInput():
        #Kör pythonkoden från webbsidan och skriver outputen till pythonoutput, och error till pythonerror.
        #Just nu körs filen två gånger för få både output och error utskrivet till olika filer. Kanske går att förenkla till en körning?
        #Om man tar bort den första os.system så får man bara resultatet av den andra. EX, det blir tomt i output, men det skrivs till error eller omvänt om man byter ordning på de.
        #OBS: Om det blir error så skrivs inget till outputfilen, den blir tom! Förutom om man kör programmet för första gången i containern, då skrivs det till output ändå.
        os.system("python pythontest.py" + " > /usr/src/app/outputfiles/pythonoutput.txt")
        os.system("python pythontest.py" + " 1> /usr/src/app/outputfiles/pythonoutput.txt")
        os.system("python pythontest.py" + " 2> /usr/src/app/outputfiles/pythonerror.txt")
executeInput()