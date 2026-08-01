import Home from "./icons/chart-bullish-svgrepo-com.svg?react";
import Stadium from "./icons/stadium.svg?react";
import Dashboard from "./icons/dashboard.svg?react";
import Analytics from "./icons/analytics.svg?react";
import Booking from "./icons/booking.svg?react";
import Finance from "./icons/finance.svg?react";
import Messages from "./icons/messages.svg?react";
import Settings from "./icons/settings.svg?react";
export const icons = {
  home: Home,
  stadium: Stadium,
  dashboard: Dashboard,
  analytics: Analytics,
  booking: Booking,
  finance: Finance,
  messages: Messages,
  settings: Settings,
} as const;

export type IconName = keyof typeof icons;
