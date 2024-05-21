import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Timestamp } from "firebase/firestore";
import { addInfo } from "./api";
import { NewInfoType } from "./types";

export const LogPage = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <>
      <Typography>
        <b>Zaloguj się</b>
      </Typography>
      <form onSubmit={handleSubmit}>
        <div id="inputsInfo">
          <TextField id="topic" label="Login" variant="outlined" name="topic" />

          <TextField
            id="text"
            label="Hasło"
            variant="outlined"
            name="text"
            multiline
          />
        </div>
        <div id="infoButtons">
          <Button type="submit" id="add" variant="contained" color="primary">
            Dodaj
          </Button>
        </div>
      </form>
    </>
  );
};
