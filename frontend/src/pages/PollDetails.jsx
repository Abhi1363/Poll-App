import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, Card, CardContent } from "@mui/material";
import { getPollDetails, voteDetails } from "../services/api";
import BackButton from "../components/backButton";

const PollDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const fetchPoll = () => {
    getPollDetails(id)
      .then(res => {
        setPoll(res.data.poll);
        setOptions(res.data.options);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPoll();
  }, [id]);

  const handleVote = () => {
    if (!selectedOption) return;

    voteDetails(id, selectedOption)
      .then(() => {
        setHasVoted(true);
        fetchPoll();
      })
      .catch(err => console.error(err));
  };

  const handleViewResults = () => {
    navigate(`/poll/${id}/results`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f0f4f8, #e2e8f0)",
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="end" mb={3}>
          <BackButton />
        </Box>

        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 6,
            backgroundColor: "#ffffff",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#0d47a1">
              {poll?.question}
            </Typography>

            {options.map(option => (
              <Box key={option.id} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant={selectedOption === option.id ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setSelectedOption(option.id)}
                  disabled={hasVoted}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    py: 1.5,
                  }}
                >
                  {option.text}
                </Button>
              </Box>
            ))}

            
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!selectedOption || hasVoted}
              onClick={handleVote}
            >
              Submit Vote
            </Button>

            {hasVoted ? (
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleViewResults}
              >
                View Results
              </Button>
            ) : (
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Vote to view results
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default PollDetail;
