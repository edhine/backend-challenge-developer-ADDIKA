import { CommentProperties } from "../../domain/comment";

export class Event {
  readonly subject: string;
  readonly data: CommentProperties;
}

export class IntegrationEvent {
  readonly subject: string;
  readonly data: Record<string, string>;
}

export interface IntegrationEventPublisher {
  publish: (event: IntegrationEvent) => Promise<void>;
}
