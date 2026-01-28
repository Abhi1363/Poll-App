import { useEffect, useState } from "react";
import { getAllPolls, deletePoll } from "../services/api";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";

const PollList = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const res = await getAllPolls();
      setPolls(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchPolls);
  }, []);

  const handleDelete = (pollId) => {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;

    deletePoll(pollId)
      .then(() => {
        alert("Poll deleted successfully");
        fetchPolls();
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting poll");
      });
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to right, #f0f4f8, #e2e8f0)",
        py: 5,
      }}
    >
      <Box maxWidth={900} mx="auto" px={2}>
      
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#0d47a1" }}
          >
            Mini Polling App
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => navigate("/create")}
          >
            Create New Poll +
          </Button>
        </Box>

        
        {polls.map((poll) => (
          <Card
            key={poll.id}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 8,
                transform: "scale(1.01)",
              },
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Chip
                  label={poll.isActive ? "Active" : "Closed"}
                  color={poll.isActive ? "success" : "default"}
                  size="small"
                />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(poll.id)}
                >
                  Delete
                </Button>
              </Box>

              <Typography
                variant="h6"
                mb={2}
                sx={{ fontWeight: 500, color: "#333" }}
              >
                {poll.question}
              </Typography>

              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/pollDetails/${poll.id}`)}
                >
                  View Poll
                </Button>

             
              </Box>
            </CardContent>
          </Card>
        ))}

        {polls.length === 0 && (
          <Typography
            variant="body1"
            textAlign="center"
            mt={5}
            sx={{ color: "#555" }}
          >
            No polls available. Click "Create New Poll" to get started.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PollList;
