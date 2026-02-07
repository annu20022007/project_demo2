FROM node:20-bookworm
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN npm install
RUN pip3 install -r backend/requirements.txt --break-system-packages
EXPOSE 3000
CMD ["npm", "run", "dev"]
