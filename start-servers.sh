#!/bin/bash
# Start backend server in the background
npm run start:test &

# Start frontend server in the background
cd frontend && npm start &
