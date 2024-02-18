import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { currentPageType } from "./App";
import { InboxList } from "./InboxList";

export const Navigation = ({
  setPage,
}: {
  setPage: (page: currentPageType) => void;
}) => {
  return (
    <>
      <Button
        onClick={() => {
          setPage("start");
        }}
        variant="contained"
        color="primary"
      >
        Strona Główna
      </Button>
      <Button
        onClick={() => {
          setPage("add");
        }}
        variant="contained"
        color="primary"
      >
        Dodaj zlecenie
      </Button>
      <Button
        onClick={() => {
          setPage("urgent");
        }}
        variant="contained"
        color="primary"
      >
        Pilne
      </Button>
      <Button
        onClick={() => {
          setPage("all");
        }}
        variant="contained"
        color="primary"
      >
        Wszystkie zlecenia
      </Button>

      <Button
        onClick={() => {
          setPage("add-info");
        }}
        variant="contained"
        color="primary"
      >
        Dodaj informacje
      </Button>
    </>
  );
};
