import ReactJoyride, { CallBackProps, STATUS } from "react-joyride";
import { tourSteps } from "../configs/constants";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUserId } from "../redux/features/userSlice";

const Tour: React.FC = () => {
  const theme = useTheme();
  const userId = useSelector(loggedInUserId);
  const [startTour, setStartTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem(`tourCompleted_${userId}`);
    if (tourCompleted !== "true") {
      setStartTour(true);
    }
  }, [userId]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setStartTour(false);
      localStorage.setItem(`tourCompleted_${userId}`, "true");
    }
  };
  return (
    <>
      {startTour && (
        <ReactJoyride
          callback={handleJoyrideCallback}
          showSkipButton
          continuous={true}
          scrollToFirstStep={true}
          showProgress={true}
          steps={tourSteps}
          styles={{
            options: {
              overlayColor: "rgba(0, 0, 0, 0.50)",
              primaryColor: theme.palette.primary.main,
              zIndex: 2000,
            },
          }}
        />
      )}
    </>
  );
};

export default Tour;
