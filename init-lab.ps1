Write-Host "Initializing MongoDB Learning Lab..." -ForegroundColor Cyan

# 1. Check for Dependencies
Write-Host "`Checking Dependencies..." -ForegroundColor Yellow
if (-not (Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js (npm) is not installed."
    exit 1
}
if (-not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed."
    exit 1
}

# 2. Install Project Dependencies
Write-Host "Installing Shared Dependencies..." -ForegroundColor Yellow
Write-Host "   > npm install..."
npm install | Out-Null

if (Get-Command "pip" -ErrorAction SilentlyContinue) {
    Write-Host "   > pip install..."
    pip install -r requirements.txt | Out-Null
} else {
    Write-Host "   ! pip not found, skipping Python deps." -ForegroundColor DarkGray
}

# 3. Start Infrastructure
Write-Host "Starting Docker Containers..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "Waiting for database to be ready..."
Start-Sleep -Seconds 5

# 4. Seed Data
Write-Host "Seeding Database..." -ForegroundColor Yellow
npm run seed

Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "   MongoDB: mongodb://localhost:27018"
Write-Host "   GUI: http://localhost:8081"
Write-Host "Happy Learning!" -ForegroundColor Cyan
