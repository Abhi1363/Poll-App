import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, LinearProgress, Box, Card, CardContent } from "@mui/material";
import { getPollResults } from "../services/api";
import BackButton from "../components/backButton";

const Results = () => {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [options, setOptions] = useState([]);

  const fetchResults = () => {
    getPollResults(id)
      .then((res) => {
        setPoll(res.data.poll);
        setOptions(res.data.options);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchResults();
  }, [id]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

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

      
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6, backgroundColor: "#ffffff" }}>
          <CardContent>
           
            <Typography variant="h5" fontWeight="bold" mb={3} color="#0d47a1">
              {poll?.question}
            </Typography>

            {options.map((option) => {
              const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);

              return (
                <Box key={option.id} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {option.text}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{ mt: 1, height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="caption" sx={{ mt: 0.5, display: "block", color: "#555" }}>
                    {percentage}% ({option.votes} votes)
                  </Typography>
                </Box>
              );
            })}

           
            <Typography variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
              Total votes: {totalVotes}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Results;
