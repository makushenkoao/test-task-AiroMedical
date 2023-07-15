export enum AppRoutes {
  MAIN = "main",
  DETAILS = "details",
  NOT_FOUND = "not_found",
}

export const getRouteMain = () => "/";
export const getRouteDetails = (id: string) => `/${id}`;
