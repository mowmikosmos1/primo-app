import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Timestamp } from "firebase/firestore";
import { addInfo } from "./api";
import { NewInfoType } from "./types";

const defaultInfo = {
  topic: "",
  text: "",
};

export const InfoForm = ({ getAllInfo }: { getAllInfo: () => void }) => {
  const [info, setInfo] = useState<NewInfoType>(defaultInfo);
  const [topicError, setTopicError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "topic" && e.target.value.length < 1) {
      setTopicError(true);
    } else if (e.target.name === "topic") {
      setTopicError(false);
    }

    setInfo((prev) => {
      const updatedOrder = { ...prev, [e.target.name]: e.target.value };
      return updatedOrder;
    });
  };

  const handleCancel = () => {
    setInfo(defaultInfo);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (topicError) return;
    const now = new Date();

    const infoFormated = {
      ...info,
      created: Timestamp.fromDate(now),
    };

    await addInfo(infoFormated);
    setInfo(defaultInfo);
    await getAllInfo();
  };

  return (
    <Box>
      <Typography>
        <b>Dodaj informację</b>
      </Typography>
      <form onSubmit={handleSubmit}>
        <div id="inputsInfo">
          <TextField
            onChange={handleChange}
            id="topic"
            label="Dodaj temat informacji"
            variant="outlined"
            name="topic"
            error={topicError}
          />

          <TextField
            onChange={handleChange}
            id="text"
            label="Dodaj treść informacji"
            variant="outlined"
            name="text"
            multiline
          />
        </div>
        <div id="infoButtons">
          <Button
            type="button"
            id="cancel"
            variant="contained"
            color="primary"
            onClick={handleCancel}
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            id="add"
            variant="contained"
            color="primary"
            disabled={topicError}
          >
            Dodaj
          </Button>
        </div>
      </form>
    </Box>
  );
};
