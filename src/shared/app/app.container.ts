import { container } from "tsyringe";

import { HealthContainer } from "@/domain/health";
import { MovieContainer } from "@/domain/movie";

import { ProvidersContainer } from "@/shared/providers/providers.container";

import { ServicesContainer } from "@/shared/services/services.container";

ProvidersContainer.register(container);

ServicesContainer.register(container);

HealthContainer.register(container);
MovieContainer.register(container);
