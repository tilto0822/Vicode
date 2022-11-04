import { v4 as uuidv4 } from 'uuid';

/**
 * This class is used to define the connection between two interface of flow.
 */
export class NodeConnection {
  private _id: string;
  private _originId: string;
  private _destinationId: string;

  /**
   * @param originId The id of the origin flow.
   * @param destinationId The id of the destination flow.
   * @param id Flow connection id. If not provided, a new id will be generated.
   */
  constructor(originId: string, destinationId: string, id?: string) {
    this._id = id || uuidv4();
    this._originId = originId;
    this._destinationId = destinationId;
  }

  /**
   * @returns The id of the flow connection.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * @returns The id of the origin flow.
   */
  public get originId(): string {
    return this._originId;
  }

  /**
   * @returns The id of the destination flow.
   */
  public get destinationId(): string {
    return this._destinationId;
  }
}

export default NodeConnection;
