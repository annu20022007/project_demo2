from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import requests

import database
import auth_utils

app = FastAPI(title="Cosmic Watch - Interstellar Tracker")

# ✅ CORS (DO NOT DUPLICATE allow_origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=NASA_API_KEY"
    r = requests.get(url, timeout=5)
    r.raise_for_status()
    return r.json()

@app.post("/register", status_code=201)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(database.User).filter_by(username=payload.username).first():
        raise HTTPException(400, "User already exists")

    user = database.User(
        username=payload.username,
        hashed_password=auth_utils.hash_password(payload.password),
    )
    db.add(user)
    db.commit()

    return {"message": "Registered"}

@app.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(database.User).filter_by(username=payload.username).first()

    if not user or not auth_utils.verify_password(payload.password, user.hashed_password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid credentials")

    token = auth_utils.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}
