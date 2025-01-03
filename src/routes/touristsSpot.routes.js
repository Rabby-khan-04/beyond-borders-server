import { Router } from "express";
import TouristSpotController from "../controllers/touristSpot.controller.js";

const router = Router();

router.route("/sliders").get(TouristSpotController.getAllSlider);
router.route("/countries").get(TouristSpotController.getAllCountries);

export default router;
