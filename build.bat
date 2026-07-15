@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === Portfolio site — build ===
echo.

if not exist "node_modules\" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 goto :err
)

call npm run build
if errorlevel 1 goto :err

echo.
echo Build OK: dist\
echo Preview: npm run preview  (port 4180, logs enabled)
goto :eof

:err
echo Build failed.
pause
exit /b 1
