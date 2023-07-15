import { MainPage } from "pages/MainPage";
import { DetailsPage } from "pages/DetailsPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { AppRoutes, getRouteMain, getRouteDetails } from "shared/const/router";

import { RouteProps } from "react-router-dom";

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <MainPage />,
  },
  [AppRoutes.DETAILS]: {
    path: getRouteDetails(":id"),
    element: <DetailsPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
