import { BaseInterface } from './BaseInterface';

/**
 * This class is used to define the interface for a flow.
 */
export class FlowInterface extends BaseInterface {
  /**
   * @param priority The priority of the flow.
   * @param interfaceKey Your key for the flow.
   * @param parentNodeId The id of the parent node.
   * @param canMultipleConnect If true, this flow can connect to multiple nodes.
   * @param id The id of the flow. If not provided, a new id will be generated.
   */
  constructor(
    priority: number,
    interfaceKey: string,
    parentNodeId: string,
    canMultipleConnect: boolean,
    id?: string,
  ) {
    super(priority, interfaceKey, parentNodeId, canMultipleConnect, id);
  }
}

export default FlowInterface;
