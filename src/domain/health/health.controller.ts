import { singleton } from "tsyringe";
import { IHealthController } from "./health.controller.interface";
import { IHandle } from "@/shared/interfaces";

@singleton()
export class HealthController implements IHealthController {
  constructor() {}

  health: IHandle<void, { status: string }> = async (_, response) => {
    return response.status(200).send({ status: "Working fine" });
  };
}
