import { Router } from "express";
import TouristSpotController from "../controllers/touristSpot.controller.js";

const router = Router();

router.route("/sliders").get(TouristSpotController.getAllSlider);
router.route("/countries").get(TouristSpotController.getAllCountries);
router.route("/spots").get(TouristSpotController.getAllTouristsSpots);
router.route("/spot/:id").get(TouristSpotController.getTouristSpot);
router.route("/add-spot").post(TouristSpotController.addATouristSpot);
router.route("/my-spots/:user_email").get(TouristSpotController.getAllMySpots);
router.route("/update-spot/:id").patch(TouristSpotController.updateASpot);
router
  .route("/delete-spot/:id")
  .delete(TouristSpotController.deleteAToursitSpot);

export default router;
