import { v4 as uuidv4 } from 'uuid';
import { DataInterface } from './interface/DataInterface';
import { FlowInterface } from './interface/FlowInterface';
import NodePosition from './NodePosition';
import NodeStyle from './NodeStyle';

/**
 * This interface is used to define the interface of a base node.
 */
export interface BaseNodeOptions {
  id?: string;
  nodeKey: string;
  nodeStyle: NodeStyle;
  nodePositon: NodePosition;
  inFlowInterfaceMap: Map<string, FlowInterface>;
  outFlowInterfaceMap: Map<string, FlowInterface>;
  inDataInterfaceMap: Map<string, DataInterface<unknown>>;
  outDataInterfaceMap: Map<string, DataInterface<unknown>>;
}

/**
 * This class is used to define the base node.
 */
export abstract class BaseNode {
  private _id: string;
  private _nodeKey: string;
  private _nodeStyle: NodeStyle;
  private _nodePositon: NodePosition;
  private _inFlowInterfaceMap: Map<string, FlowInterface>;
  private _outFlowInterfaceMap: Map<string, FlowInterface>;
  private _inDataInterfaceMap: Map<string, DataInterface<unknown>>;
  private _outDataInterfaceMap: Map<string, DataInterface<unknown>>;

  /**
   * @param options The options for the base node.
   */
  constructor(options: BaseNodeOptions) {
    this._id = options.id || uuidv4();
    this._nodeKey = options.nodeKey;
    this._nodeStyle = options.nodeStyle;
    this._nodePositon = options.nodePositon;

    this._inFlowInterfaceMap = options.inFlowInterfaceMap;
    this._outFlowInterfaceMap = options.outFlowInterfaceMap;
    this._inDataInterfaceMap = options.inDataInterfaceMap;
    this._outDataInterfaceMap = options.outDataInterfaceMap;
  }

  /**
   * @returns The id of the node.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * @returns The node key of the node.
   */
  public get nodeKey(): string {
    return this._nodeKey;
  }

  /**
   * @returns The node style of the node.
   */
  public get nodeStyle(): NodeStyle {
    return this._nodeStyle;
  }

  /**
   * @returns The node position of the node.
   */
  public get nodePosition(): NodePosition {
    return this._nodePositon;
  }

  /**
   * @returns The in flow interface map of the node.
   */
  public get inFlowInterfaceMap(): Map<string, FlowInterface> {
    return this._inFlowInterfaceMap;
  }

  /**
   * @returns The in flow interface array of the node.
   */
  public get inFlowInterfaceArr(): FlowInterface[] {
    return Array.from(this._inFlowInterfaceMap.values()).sort((a, b) => a.priority - b.priority);
  }

  /**
   * @returns The out flow interface map of the node.
   */
  public get outFlowInterfaceMap(): Map<string, FlowInterface> {
    return this._outFlowInterfaceMap;
  }

  /**
   * @returns The out data interface array of the node.
   */
  public get outFlowInterfaceArr(): FlowInterface[] {
    return Array.from(this._outFlowInterfaceMap.values()).sort((a, b) => a.priority - b.priority);
  }

  /**
   * @returns The in data interface map of the node.
   */
  public get inDataInterfaceMap(): Map<string, DataInterface<unknown>> {
    return this._inDataInterfaceMap;
  }

  /**
   * @returns The in data interface array of the node.
   */
  public get inDataInterfaceArr(): DataInterface<unknown>[] {
    return Array.from(this._inDataInterfaceMap.values()).sort((a, b) => a.priority - b.priority);
  }

  /**
   * @returns The out data interface map of the node.
   */
  public get outDataInterfaceMap(): Map<string, DataInterface<unknown>> {
    return this._outDataInterfaceMap;
  }

  /**
   * @returns The out data interface array of the node.
   */
  public get outDataInterfaceArr(): DataInterface<unknown>[] {
    return Array.from(this._outDataInterfaceMap.values()).sort((a, b) => a.priority - b.priority);
  }

  /**
   * This method is used to fetch the data of node.
   */
  public abstract fetchData(): Promise<boolean>;
}

export default BaseNode;
