import { PostProperties } from "../../domain/post";

export class Event {
  readonly subject: string;
  readonly data: PostProperties;
}

export class IntegrationEvent {
  readonly subject: string;
  readonly data: Record<string, string>;
}

export interface IntegrationEventPublisher {
  publish: (event: IntegrationEvent) => Promise<void>;
}
