import { ExternalTaskDTO } from "./external-task-dto";
import { InternalTaskDTO } from "./internal-task-dto";

export class InternalExternalListDTO {
    internalTask!: InternalTaskDTO[];
    externalTask!: ExternalTaskDTO[];
}
