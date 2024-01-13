import { useEffect, useState } from "react";

export const Clock = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // useEffect(() => {}, [])  funkcja w tym useEffect wykona się jeden raz po zamontowaniu komponentu
  // uwaga! możesz zobaczyć w konsoli, ze te useEffect wykonują się 2 razy w tryebie dev i testowym czyli lokalnie

  useEffect(() => {
    const timer = setInterval(refresh, 1000);

    // to się wykonuje gdy komponent jest usuwany ze stony - unmounted
    return () => {
      clearInterval(timer);
    };
  }, []);

  const refresh = () => {
    setCurrentDate(new Date());
  };

  const dayOfWeek = currentDate.toLocaleDateString("pl-PL", {
    weekday: "long",
  });
  return (
    <>
      <div id="dateDisplay">
        <b>
          Data : {currentDate.toLocaleDateString()}
          <br></br> {dayOfWeek.toUpperCase()}
        </b>
      </div>
      <div id="timeDisplay">
        <b>Czas : {currentDate.toLocaleTimeString()}</b>{" "}
      </div>
    </>
  );
};
