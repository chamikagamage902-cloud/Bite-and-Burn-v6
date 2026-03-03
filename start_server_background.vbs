Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "npm" & chr(34) & " start", 0
Set WshShell = Nothing
