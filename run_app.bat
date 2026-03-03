@echo off
echo Starting Bite and Burn...
cscript //nologo start_server_background.vbs
timeout /t 2 /nobreak >nul
start index.html
echo App launched.
pause
