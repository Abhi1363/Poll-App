import axios from "axios";

const API =  axios.create({baseURL: "http://localhost:5000"});

export const getAllPolls = () => API.get("/");

export const getPollDetails = (id) => API.get(`/${id}`);

export const createPoll = (pollData) => API.post("/create", pollData);

export const voteDetails = (pollId, optionId) => API.post(`/polls/${pollId}/vote`, { optionId });

export const getPollResults = (id) => API.get(`/polls/${id}/results`);

export const deletePoll = (id) => API.delete(`/polls/${id}`);

