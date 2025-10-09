import { useState, useEffect } from "react";
import TransText from "@components/TransText";

const Countdown = ({ targetDate }) => {
  const { selectedLanguage } = "en";
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};
    // console.log('now : ', new Date());
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      dir={`${selectedLanguage === "ar" ? "rtl" : "ltr"}`}
      className="bg-[#9e7d00] lg:px-6 px-3  py-3 flex flex-col gap-4 rounded-md"
    >
      <div className="flex items-center gap-2 text-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p className="font-medium">
          <TransText
            en="Event Countdown"
            ar="العد التنازلي للحدث"
            fr="Compte à rebours de l'événement"
          />
        </p>
      </div>
      <div className={`flex gap-5 justify-center items-center lg:space-x-4 `}>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-beta rounded-lg p-2 lg:w-[4vw] aspect-square text-2xl  font-medium">
            {timeLeft.days}
          </div>
          <span className="text-white/80 text-base">
            <TransText en="Days" ar="أيام" fr="Jours" />{" "}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-beta rounded-lg p-2 lg:w-[4vw] aspect-square text-2xl  font-medium">
            {timeLeft.hours}
          </div>
          <span className="text-white/80 text-base">
            <TransText en="Hours" fr="Heures" ar="ساعات" />{" "}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-beta rounded-lg p-2 lg:w-[4vw] aspect-square text-2xl  font-medium">
            {timeLeft.minutes}
          </div>
          <span className="text-white/80 text-base">
            {" "}
            <TransText en="Minutes" fr="Minutes" ar="دقائق" />{" "}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-beta rounded-lg p-2 lg:w-[4vw] aspect-square text-2xl  font-medium">
            {timeLeft.seconds}
          </div>
          <span className="text-white/80 text-base">
            <TransText en="Seconds" fr="Secondes" ar="ثواني" />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
