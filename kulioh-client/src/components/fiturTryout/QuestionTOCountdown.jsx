import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import ClockComponent from "../../components/fiturSoalHarian/ClockComponent";

export default function QuestionTOCountdown({ handleSubmit }) {
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
  const [after, setAfter] = useState();
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [clicked, setClicked] = useState(false);

  console.log(isLoadingFinish);

  let interval;
  //   useEffect(() => {
  //     startTimer();
  //   }, [interval]);

  const startTimer = () => {
    let finish;
    finish = new Date();
    const today = new Date();
    finish.setDate(today.getDate());
    // finish.setHours(today.getHours() + 2);
    // finish.setMinutes(today.getMinutes() + 30);
    finish.setSeconds(today.getSeconds() + 10);
    console.log(finish, `ini expektasi finish`);

    setAfter(finish);
    // console.log(after, ` dimasukkan ke state`);
    // console.log(after);

    const countDownDate = new Date(finish).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      //   console.log(minutes);

      if (distance < 0) {
        clearInterval(interval);
        handleSubmit();
      } else {
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // setClicked(true);
    startTimer();
    setIsLoadingFinish(true);
  };

  return (
    <>
      <button onClick={(e) => handleClick(e)}>Mulai</button>
      {isLoadingFinish ? (
        <Container>
          <ClockComponent
            timerHours={timerHours}
            timerMinutes={timerMinutes}
            timerSeconds={timerSeconds}
          />
        </Container>
      ) : null}
    </>
  );
}