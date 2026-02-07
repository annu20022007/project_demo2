from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import requests
import database
import auth_utils

app = FastAPI(title="Cosmic Watch - Interstellar Tracker")

# Database connection helper
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Cosmic Watch System is Online"}

# REQUIREMENT: Real-Time Data Feed (NASA NeoWs)
@app.get("/asteroids")
def get_asteroids():
    url = "https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY"
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        # Prevents the Internal Server Error by providing a clear message
        raise HTTPException(status_code=500, detail=f"NASA Connection Failed: {str(e)}")

# REQUIREMENT: User Authentication & Verification
@app.post("/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    db_user = db.query(database.User).filter(database.User.username == username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed = auth_utils.hash_password(password)
    new_user = database.User(username=username, hashed_password=hashed)
    db.add(new_user)
    db.commit()
    return {"status": "Success", "message": f"Researcher {username} registered"}

@app.post("/login")
def login(username: str, password: str, db: Session = Depends(get_db)):
    user = db.query(database.User).filter(database.User.username == username).first()
    if not user or not auth_utils.verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = auth_utils.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}