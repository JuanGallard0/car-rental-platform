import mongoose from "mongoose";
import Car from "../models/Car.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";

/**
 * GET /api/cars
 */
export const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();

  sendResponse(res, 200, {
    data: cars,
    meta: { count: cars.length },
  });
});

/**
 * GET /api/cars/available
 */
export const getAvailableCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ available: true });

  sendResponse(res, 200, {
    data: cars,
    meta: { count: cars.length },
  });
});

/**
 * GET /api/cars/:id
 */
export const getCarById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid car ID", 400);
  }

  const car = await Car.findById(id);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  sendResponse(res, 200, { data: car });
});

/**
 * POST /api/cars
 */
export const createCar = asyncHandler(async (req, res) => {
  const car = await Car.create(req.body);

  sendResponse(res, 201, {
    data: car,
    message: "Car created successfully",
  });
});

/**
 * PUT /api/cars/:id
 */
export const updateCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid car ID", 400);
  }

  const car = await Car.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  sendResponse(res, 200, {
    data: car,
    message: "Car updated successfully",
  });
});

/**
 * DELETE /api/cars/:id
 */
export const deleteCar = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid car ID", 400);
  }

  const car = await Car.findByIdAndDelete(id);

  if (!car) {
    throw new AppError("Car not found", 404);
  }

  sendResponse(res, 200, {
    message: "Car deleted successfully",
  });
});
