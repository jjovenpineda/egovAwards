import { useEffect, useState } from "react";

export default function useInactivityTimeout(timeout = 30 * 60 * 1000) {
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleActivity = () => {
      if (isInactive) {
        setIsInactive(false);
      }
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsInactive(true);
      }, timeout);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    events.forEach((event) => window.addEventListener(event, handleActivity));

    handleActivity();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [isInactive, timeout]);

  return {
    isInactive,
    resetInactivity: () => setIsInactive(false),
  };
}
