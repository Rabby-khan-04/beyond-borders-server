import { database } from "../db/index.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const Slider = database.collection("slider");
const Countries = database.collection("countries");

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

const TouristSpotController = { getAllSlider, getAllCountries };

export default TouristSpotController;
