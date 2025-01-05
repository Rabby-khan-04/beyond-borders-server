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

const getAllMySpots = asyncHandler(async (req, res) => {
  const { user_email } = req.params;
  const query = { user_email };

  const cursor = TouristsSpots.find(query);
  const spots = await cursor.toArray();

  return res
    .status(200)
    .json(new ApiResponse(200, spots, "My spot list fetched successfully"));
});

const updateASpot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedSpotData = req.body;
  const query = { _id: new ObjectId(id) };
  const updatedDoc = {
    $set: {
      image: updatedSpotData.image,
      tourists_spot_name: updatedSpotData.tourists_spot_name,
      country_name: updatedSpotData.country_name,
      location: updatedSpotData.location,
      short_description: updatedSpotData.short_description,
      average_cost: parseInt(updatedSpotData.average_cost),
      seasonality: updatedSpotData.seasonality,
      travel_time: updatedSpotData.travel_time,
      totalVisitorsPerYear: parseInt(updatedSpotData.totalVisitorsPerYear),
      user_email: updatedSpotData.user_email,
      user_name: updatedSpotData.user_name,
    },
  };

  const option = { upsert: true, new: true };

  const result = await TouristsSpots.updateOne(query, updatedDoc, option);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Tourist spot updated successfully!!!"));
});

const TouristSpotController = {
  getAllSlider,
  getAllCountries,
  getAllTouristsSpots,
  getTouristSpot,
  addATouristSpot,
  getAllMySpots,
  updateASpot,
};

export default TouristSpotController;
