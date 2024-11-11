import { IHandle } from "@/shared/interfaces";

export interface IHealthController {
  health: IHandle<void, { status: string }>;
}
