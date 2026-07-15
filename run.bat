@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === Portfolio site ===
echo.

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 goto :err
)

if not exist "logs\" mkdir logs

echo Starting dev server on http://localhost:5180
echo Client logs: logs\portfolio-YYYY-MM-DD.log
echo.
call npm run dev
goto :eof

:err
echo Failed.
pause
exit /b 1
