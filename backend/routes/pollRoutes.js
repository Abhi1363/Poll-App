
import express from "express";
import {
  getAllPolls,
    getPollDetails,
    createPoll,votePoll, getPollResults,deletePoll
} from "../controllers/pollController.js";

const router = express.Router();
const app = express();
app.use(express.json());
router.get("/", getAllPolls);
router.get("/:id", getPollDetails);

router.post("/create", createPoll);
router.post("/polls/:id/vote", votePoll);
router.get("/polls/:id/results", getPollResults);

router.delete("/polls/:id", deletePoll);

export default router;
