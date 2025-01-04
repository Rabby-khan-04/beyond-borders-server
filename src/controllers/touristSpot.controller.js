import { ObjectId } from "mongodb";
import { database } from "../db/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const Slider = database.collection("slider");
const Countries = database.collection("countries");
const TouristsSpots = database.collection("tourists-spots");

const getAllSlider = asyncHandler(async (req, res) => {
  const cursor = Slider.find();
  const sliders = await cursor.toArray();

  return res
    .status(200)
    .json(new ApiResponse(200, sliders, "Slider Data Fetched Successfully!!!"));
});

const getAllCountries = asyncHandler(async (req, res) => {
  const cursor = Countries.find();
  const countries = await cursor.toArray();

  return res
    .status(200)
    .json(
      new ApiResponse(200, countries, "Countries Data Fetched Successfully!!!")
    );
});

const getAllTouristsSpots = asyncHandler(async (req, res) => {
  const cursor = TouristsSpots.find();
  const touriestsSpots = await cursor.toArray();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        touriestsSpots,
        "Touriests Spots Data Fetched Successfully!!!"
      )
    );
});

const getTouristSpot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };

  const touristSpot = await TouristsSpots.findOne(query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        touristSpot,
        "Touriest Spot Data Fetched Successfully!!!"
      )
    );
});

const addATouristSpot = asyncHandler(async (req, res) => {
  const spotData = req.body;

  if (!spotData.user_email) {
    throw new ApiError(409, "User email is required");
  }

  spotData.average_cost = parseInt(spotData.average_cost);
  spotData.totalVisitorsPerYear = parseInt(spotData.totalVisitorsPerYear);

  const result = await TouristsSpots.insertOne(spotData);

  const createdSpot = await TouristsSpots.findOne({ _id: result.insertedId });

  if (!createdSpot) {
    throw new ApiError(
      500,
      "Something went wrong while creating tourists spot"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdSpot, "Tourist spot added successfully!!")
    );
});

const TouristSpotController = {
  getAllSlider,
  getAllCountries,
  getAllTouristsSpots,
  getTouristSpot,
  addATouristSpot,
};

export default TouristSpotController;
