import { Outlet } from "react-router-dom";
import { AnalyticsTracker } from "./analytics-tracker";

export const RootLayout = () => {
  return (
    <>
      <AnalyticsTracker />
      <Outlet />
    </>
  );
};
