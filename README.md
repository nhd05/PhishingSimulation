## Running the Frontend

```bash
cd frontend
npm install
npm start
```

## Running the Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Running Docker

```bash
docker build -t fullstack-app .
docker run -p 5000:5000 fullstack-app
```

## CI/CD Pipeline

The pipeline automatically:
1. Pulls the newest code
2. Runs ESLint and Flake8
3. Runs frontend/backend tests
4. Builds a Docker image
5. Deploys the container
6. Runs smoke tests
