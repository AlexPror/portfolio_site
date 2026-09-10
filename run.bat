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

echo.
echo Dev server:  http://localhost:5180/portfolio_site/
echo (base path /portfolio_site/ — без него будет пустая страница)
echo.
echo Client logs: logs\portfolio-YYYY-MM-DD.log
echo Stop: Ctrl+C
echo.

call npm run dev
goto :eof

:err
echo Failed.
pause
exit /b 1
