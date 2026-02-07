from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import requests

import database
import auth_utils

app = FastAPI(title="Cosmic Watch - Interstellar Tracker")


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str


@app.get("/")
def home():
    return {"message": "Cosmic Watch System is Online"}

@app.get("/asteroids")
def get_asteroids():
    url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"NASA Connection Failed: {str(e)}"
        )


@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = (
        db.query(database.User)
        .filter(database.User.username == payload.username)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = auth_utils.hash_password(payload.password)

    new_user = database.User(
        username=payload.username,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": f"Researcher {payload.username} registered successfully"
    }

# ---------------------------
@app.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = (
        db.query(database.User)
        .filter(database.User.username == payload.username)
        .first()
    )

    if not user or not auth_utils.verify_password(
        payload.password, user.hashed_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    access_token = auth_utils.create_access_token(
        data={"sub": user.username}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
