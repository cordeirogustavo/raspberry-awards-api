import { singleton } from "tsyringe";
import { IHealthController } from "./health.controller.interface";
import { IHandle } from "@/shared/interfaces";

@singleton()
export class HealthController implements IHealthController {
  health: IHandle<void, string> = async (_, response) => {
    return response.status(200).send("Working fine");
  };
}
