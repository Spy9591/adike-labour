let audio;

export const playNotificationSound = () => {
  if (typeof window === "undefined") return;

  if (!audio) {
    audio = new Audio("/mixkit-bell-notification-933.wav");
    audio.preload = "auto";
    audio.volume = 1;
  }

  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.log("Unable to play notification sound:", error);
  });
};
