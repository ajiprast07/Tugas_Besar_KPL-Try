@echo off
echo Starting Product Management System...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo npm version:
npm --version
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo Error: package.json not found
    echo Please make sure you're in the correct directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
)

REM Create .env from template if it doesn't exist
if not exist ".env" (
    if exist ".env.example" (
        echo Creating .env file from template...
        copy ".env.example" ".env"
    ) else (
        echo Creating default .env file...
        echo NODE_ENV=development > .env
        echo PORT=3000 >> .env
        echo ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000,http://127.0.0.1:5500 >> .env
        echo LOG_LEVEL=info >> .env
    )
    echo.
)

echo Starting the server...
echo.
echo Server will be available at: http://localhost:3000
echo Health check: http://localhost:3000/health
echo API documentation: http://localhost:3000/api
echo.
echo To stop the server, press Ctrl+C
echo.

REM Start the server
npm start

pause