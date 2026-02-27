import Car from "../models/Car.js";
import { sendResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/cars
 */
export const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  sendResponse(res, 200, cars);
});

/**
 * GET /api/cars/available
 */
export const getAvailableCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ available: true });
  sendResponse(res, 200, cars);
});

/**
 * GET /api/cars/:id
 */
export const getCarById = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return sendResponse(res, 404, null, "Car not found");
  }

  sendResponse(res, 200, car);
});

/**
 * POST /api/cars
 */
export const createCar = asyncHandler(async (req, res) => {
  const car = await Car.create(req.body);
  sendResponse(res, 201, car);
});

/**
 * PUT /api/cars/:id
 */
export const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!car) {
    return sendResponse(res, 404, null, "Car not found");
  }

  sendResponse(res, 200, car);
});

/**
 * DELETE /api/cars/:id
 */
export const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    return sendResponse(res, 404, null, "Car not found");
  }

  sendResponse(res, 200, null, "Car deleted successfully");
});
