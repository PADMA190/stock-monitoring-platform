# Stock Monitoring Platform using Django REST and ReactJS

This repository contains a Django backend integrated with a React frontend to create a full-stack web application.

## Setup

### Prerequisites

- Python 3.x installed
- Node.js and npm installed


### Project Setup into Local Machine

1. Clone the repository:

    ```
    git clone <repository_url>
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd frontend
    ```

2. Install Node.js dependencies:

    ```
    npm install
    ```

3. Create the build folder:

    ```
    npm run build
    ```


### Backend Setup

1. Navigate to the backend directory:

    ```
    cd backend
    ```

2. Install Python dependencies:

    ```
    pip install -r requirements.txt
    ```

3. Apply migrations:

    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

4. Run the Django server:

    ```
    python manage.py runserver
    ```

## Usage

Once both the backend and frontend servers are running, you can access the web application by navigating to `http://localhost:8000` in your web browser.

## Folder Structure

- **backend**: Contains the Django backend code.
- **frontend**: Contains the React frontend code.
