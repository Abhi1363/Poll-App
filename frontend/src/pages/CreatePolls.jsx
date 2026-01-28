import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createPoll } from "../services/api";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/backButton";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!question || options.some((opt) => !opt)) {
      alert("Please fill question and all options");
      return;
    }

    createPoll({ question, options })
      .then(() => {
        alert("Poll created successfully");
        navigate("/");
      })
      .catch((err) => console.error(err));
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
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 6, backgroundColor: "#ffffff" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" mb={3} color="#0d47a1">
              Create New Poll
            </Typography>

            
            <TextField
              fullWidth
              label="Poll Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle1" fontWeight={500} mb={1}>
              Options
            </Typography>

            {options.map((option, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                mb={2}
                gap={1}
              >
                <TextField
                  fullWidth
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <IconButton
                  onClick={() => removeOption(index)}
                  color="error"
                  disabled={options.length <= 2}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            <Button
              variant="outlined"
              onClick={addOption}
              sx={{ mb: 3 }}
            >
              + Add Option
            </Button>
            
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ py: 1.5, fontWeight: 500 }}
            >
              Create Poll
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CreatePoll;
