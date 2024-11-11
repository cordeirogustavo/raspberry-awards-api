import { container } from "tsyringe";

import { HealthContainer } from "@/domain/health";
import { MovieContainer } from "@/domain/movie";

import { ProvidersContainer } from "@/shared/providers/providers.container";

ProvidersContainer.register(container);

HealthContainer.register(container);
MovieContainer.register(container);
