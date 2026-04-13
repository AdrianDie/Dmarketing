@echo off
REM Kjør dette én gang som administrator for å sette opp automatisk kjøring
REM Høyreklikk → "Kjør som administrator"

set REPO=C:\Users\adria\OneDrive\UIS\GitHub\Dmarketing
set NODE=node

echo Setter opp pipeline til å kjøre kl. 03:00 hver natt...

schtasks /create /tn "DMarketingPipeline" ^
  /tr "cmd /c cd /d %REPO% && %NODE% pipeline.js >> leads\_pipeline_log.txt 2>&1" ^
  /sc DAILY ^
  /st 03:00 ^
  /ru "%USERNAME%" ^
  /f

echo.
echo Ferdig! Pipeline kjorer kl. 03:00 hver natt.
echo Logg finner du i: %REPO%\leads\_pipeline_log.txt
echo.
echo For a teste med en gang:
echo   node pipeline.js
echo   node pipeline.js elektriker Oslo
pause
