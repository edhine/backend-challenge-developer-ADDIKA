import { IEvent } from "@nestjs/cqrs";
import { PostProperties } from "../post";

export class PostUpdatedEvent implements IEvent, PostProperties {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    version: number;
  }
  