import "reflect-metadata";
import "@/shared/app/app.container";

import express from "express";
import { container } from "tsyringe";
import { AppRouter } from "@/shared/app";

const app = express();
const port = 3000;

app.use(express.json());

const appRouter = container.resolve(AppRouter);

appRouter.register(app);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
