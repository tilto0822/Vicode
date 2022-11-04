import { v4 as uuidv4 } from 'uuid';
import NodeConnection from '../NodeConnection';

/**
 * This class is used to define the interface.
 */
export abstract class BaseInterface {
  private _id: string;
  private _priority: number;
  private _interfaceKey: string;
  private _parentNodeId: string;
  private _canMultipleConnect: boolean;
  private _isConnected: boolean;
  private _connectionIdArr: string[];

  /**
   * @param priority The priority of the interface.
   * @param interfaceKey Your key for the interface.
   * @param parentNodeId The id of the parent node.
   * @param canMultipleConnect If true, this interface can connect to multiple nodes.
   * @param id The id of the interface. If not provided, a new id will be generated.
   */
  constructor(
    priority: number,
    interfaceKey: string,
    parentNodeId: string,
    canMultipleConnect: boolean,
    id?: string,
  ) {
    this._id = id || uuidv4();
    this._priority = priority;
    this._interfaceKey = interfaceKey;
    this._parentNodeId = parentNodeId;
    this._canMultipleConnect = canMultipleConnect;
    this._isConnected = false;
    this._connectionIdArr = [];
  }

  /**
   * @returns The id of the interface.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * @returns The priority of the interface.
   */
  public get priority(): number {
    return this._priority;
  }

  /**
   * @returns The interface key of the interface.
   */
  public get interfaceKey(): string {
    return this._interfaceKey;
  }

  /**
   * @returns The id of the parent node.
   */
  public get parentNodeId(): string {
    return this._parentNodeId;
  }

  /**
   * @returns Whether multiple nodes can be connected.
   */
  public get canMultipleConnect(): boolean {
    return this._canMultipleConnect;
  }

  /**
   * @returns Whether the interface is connected to a node.
   */
  public get isConnected(): boolean {
    return this._isConnected;
  }

  /**
   * @returns The id of the interface connection.
   */
  public get connectionIdArr(): string[] {
    return this._connectionIdArr;
  }

  /**
   * Connects the interface to a node.
   * @param connection The interface connection to connect to.
   * @returns If the connection was successful, connection will be returned. Otherwise, null will be returned.
   */
  public connect(connection: NodeConnection): NodeConnection | null {
    if (this._canMultipleConnect) {
      this._isConnected = true;
      this._connectionIdArr.push(connection.id);
      return connection;
    }

    if (!this._isConnected) {
      this._isConnected = true;
      this._connectionIdArr[0] = connection.id;
      return connection;
    }

    return null;
  }

  /**
   * Disconnects the interface from a node.
   * @param connectionId The id of the interface connection to disconnect.
   * @returns Is the disconnection successful.
   */
  public disconnect(connectionId: string): boolean {
    if (this._canMultipleConnect) {
      const index = this._connectionIdArr.indexOf(connectionId);
      if (index > -1) {
        this._connectionIdArr.splice(index, 1);
        if (this._connectionIdArr.length === 0) {
          this._isConnected = false;
        }
        return true;
      }
      return false;
    }

    if (this._connectionIdArr[0] === connectionId) {
      this._connectionIdArr = [];
      this._isConnected = false;
      return true;
    }

    return false;
  }

  /**
   * Disconnects the interface from all nodes.
   */
  public disconnectAll(): void {
    this._connectionIdArr = [];
    this._isConnected = false;
  }
}

export default BaseInterface;
