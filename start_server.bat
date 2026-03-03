@echo off
title Bite and Burn Server
echo Starting the Bite and Burn Backend Server...
echo Directory: %CD%
npm start
if %errorlevel% neq 0 (
    echo.
    echo Server failed to start. Please check the errors above.
    pause
) else (
    echo.
    echo Server stopped.
    pause
)
