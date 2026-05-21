#!/bin/bash

echo "=== Starting CI/CD Pipeline ==="

# Step 1 - Pull latest code
echo "--- Pulling latest code from main ---"
git pull origin main
if [ $? -ne 0 ]; then
  echo "Git pull failed. Exiting."
  exit 1
fi

# Step 2 - Install Node dependencies
echo "--- Installing Node dependencies ---"
npm install
if [ $? -ne 0 ]; then
  echo "npm install failed. Exiting."
  exit 1
fi

# Step 3 - Run ESLint
echo "--- Running ESLint ---"
npm run lint
if [ $? -ne 0 ]; then
  echo "Lint failed. Exiting."
  exit 1
fi

# Step 4 - Run Biome
echo "--- Running Biome check ---"
npx @biomejs/biome check .
if [ $? -ne 0 ]; then
  echo "Biome check failed. Exiting."
  exit 1
fi

# Step 5 - Run Ruff on Python server
echo "--- Running Ruff lint on server ---"
if command -v ruff &> /dev/null; then
  ruff check server/
  if [ $? -ne 0 ]; then
    echo "Ruff lint failed. Exiting."
    exit 1
  fi
else
  echo "Ruff not found locally, skipping (handled by GitHub Actions)"
fi

# Step 6 - Run Semgrep security scan
echo "--- Running Semgrep security scan ---"
if command -v semgrep &> /dev/null; then
  semgrep --config auto src/
  if [ $? -ne 0 ]; then
    echo "Semgrep scan failed. Exiting."
    exit 1
  fi
else
  echo "Semgrep not found locally, skipping (handled by GitHub Actions)"
fi

# Step 7 - Run smoke tests
echo "--- Running smoke tests ---"
echo "Smoke test: checking src/Quiz.jsx exists"
if [ ! -f src/Quiz.jsx ]; then
  echo "Quiz.jsx not found. Exiting."
  exit 1
fi
echo "Smoke test: checking server/app.py exists"
if [ ! -f server/app.py ]; then
  echo "app.py not found. Exiting."
  exit 1
fi
echo "All smoke tests passed."

# Step 8 - Build Docker image
echo "--- Building Docker image ---"
docker build -t phishing-quiz .
if [ $? -ne 0 ]; then
  echo "Docker build failed. Exiting."
  exit 1
fi

# Step 9 - Run the Docker container
echo "--- Deploying Docker container ---"
docker stop phishing-quiz-container 2>/dev/null || true
docker rm phishing-quiz-container 2>/dev/null || true
docker run -d -p 4173:4173 --name phishing-quiz-container phishing-quiz
if [ $? -ne 0 ]; then
  echo "Docker run failed. Exiting."
  exit 1
fi

# Step 10 - Verify deployment
echo "--- Verifying deployment ---"
sleep 5
curl --fail http://localhost:4173
if [ $? -ne 0 ]; then
  echo "Deployment verification failed. App is not responding."
  exit 1
fi

echo "=== Pipeline complete. App is live at http://localhost:4173 ==="