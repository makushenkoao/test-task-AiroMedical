import { lazy } from "react";

export const DetailsPageAsync = lazy(async () => await import("./DetailsPage"));
