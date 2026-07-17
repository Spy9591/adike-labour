let audio;

export const playNotificationSound = () => {
  if (typeof window === "undefined") return;

  if (!audio) {
    audio = new Audio("/mixkit-bell-notification-933.wav");
  }

  audio.currentTime = 0;
  audio.play().catch(() => {});
};
