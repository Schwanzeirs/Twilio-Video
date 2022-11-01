import axios from "axios";

// Create base URL API
export const API = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});