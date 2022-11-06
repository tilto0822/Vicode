import BaseNode from './BaseNode';
import NodeConnection from './NodeConnection';

/**
 * This class is responsible for managing the nodes in the scene.
 */
export class NodeManager {
  private _nodeMap: Map<string, BaseNode>;
  private _connectionMap: Map<string, NodeConnection>;

  constructor() {
    this._nodeMap = new Map();
    this._connectionMap = new Map();
  }

  /**
   * @param node The node to add to the manager.
   * @returns The node that was added.
   */
  public addNode(node: BaseNode): BaseNode {
    this._nodeMap.set(node.id, node);
    return node;
  }

  /**
   * @param nodeId The node's id to check existance of.
   * @returns True if the node exists, false otherwise.
   */
  public hasNode(nodeId: string): boolean {
    return this._nodeMap.has(nodeId);
  }

  /**
   * @param nodeId The node's id to get the node from.
   * @returns The node with the given id.
   */
  public getNode(nodeId: string): BaseNode {
    const result = this._nodeMap.get(nodeId);
    if (!result) {
      throw new Error(`Node ${nodeId} not found`);
    }

    return result;
  }

  /**
   * @param nodeId The node's id to remove.
   * @returns True if the node was removed, false otherwise.
   */
  public removeNode(nodeId: string): boolean {
    return this._nodeMap.delete(nodeId);
  }

  /**
   * @param fromInterface The interface to connect from.
   * @param toInterface The interface to connect to.
   * @returns The connection that was created.
   */
  public createConnection(fromInterface: BaseNode, toInterface: BaseNode): NodeConnection {
    const connection = new NodeConnection(fromInterface.id, toInterface.id);
    this._connectionMap.set(connection.id, connection);
    return connection;
  }

  /**
   * @param fromInterface The interface to create the connections from.
   * @param toInterface The interface to create the connections to.
   * @param uuid The uuid of the connection to create.
   * @returns The connection that was created.
   */
  public createConnectionWithUUID(
    fromInterface: BaseNode,
    toInterface: BaseNode,
    uuid: string,
  ): NodeConnection {
    const connection = new NodeConnection(fromInterface.id, toInterface.id, uuid);
    this._connectionMap.set(connection.id, connection);
    return connection;
  }

  /**
   * @param connectionId The connection's id to check existance of.
   * @returns True if the connection exists, false otherwise.
   */
  public hasConnection(connectionId: string): boolean {
    return this._connectionMap.has(connectionId);
  }

  /**
   * @param connectionId The connection's id to get the connection from.
   * @returns The connection with the given id.
   */
  public getConnection(connectionId: string): NodeConnection {
    const result = this._connectionMap.get(connectionId);
    if (!result) {
      throw new Error(`Connection ${connectionId} not found`);
    }

    return result;
  }

  /**
   * @param connectionId The connection's id to remove.
   * @returns True if the connection was removed, false otherwise.
   */
  public removeConnection(connectionId: string): boolean {
    return this._connectionMap.delete(connectionId);
  }
}

export default NodeManager;
