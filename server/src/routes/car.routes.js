import express from "express";
import {
  getCars,
  getAvailableCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/car.controller.js";

const router = express.Router();

// GET all cars
router.get("/", getCars);

// GET available cars
router.get("/available", getAvailableCars);

// GET single car
router.get("/:id", getCarById);

// CREATE car
router.post("/", createCar);

// UPDATE car
router.put("/:id", updateCar);

// DELETE car
router.delete("/:id", deleteCar);

export default router;
