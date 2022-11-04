import NodeManger from '../NodeManager';
import { BaseInterface } from './BaseInterface';
import CachedData from './CachedData';
import DataInput from './DataInput';
import DataInputVariant from './DataInputVariant';

/**
 * This class is used to define the interface for a data.
 */
export class DataInterface<T> extends BaseInterface {
  private _cache: CachedData<T>;
  private _input: DataInput<T>;

  /**
   * @param priority The priority of the data.
   * @param interfaceKey Your key for the data.
   * @param parentNodeId The id of the parent node.
   * @param canMultipleConnect If true, this data can connect to multiple nodes.
   * @param id The id of the data. If not provided, a new id will be generated.
   */
  constructor(
    priority: number,
    interfaceKey: string,
    parentNodeId: string,
    canMultipleConnect: boolean,
    id?: string,
  ) {
    super(priority, interfaceKey, parentNodeId, canMultipleConnect, id);
    this._cache = {
      isCached: false,
      expiration: null,
      value: null,
    };
    this._input = {
      isInputOpened: false,
      inputValue: null,
      inputVariant: DataInputVariant.INPUT_VAR_STRING,
    };
  }

  /**
   * @returns The cached data.
   */
  public async getCache(manager: NodeManger): Promise<CachedData<T>> {
    if (this._cache.isCached) {
      if (this._cache.expiration) {
        if (this._cache.expiration.getTime() < new Date().getTime()) {
          this._cache = {
            isCached: false,
            expiration: null,
            value: null,
          };
          const res = await manager.getNode(this.parentNodeId).fetchData();
          this._cache = {
            ...this._cache,
            isCached: res,
          };
        }
      }
    }
    return this._cache;
  }

  /**
   * @returns The input data.
   */
  public get input(): DataInput<T> {
    return this._input;
  }

  /**
   * @param value The value to input.
   * @returns Updated input data.
   */
  public updateInput(value: DataInput<T>): DataInput<T> {
    this._input = value;
    return this._input;
  }

  /**
   * @param value The value to cache.
   * @returns Cached data.
   */
  public updateCache(value: CachedData<T>): CachedData<T> {
    this._cache = value;
    return this._cache;
  }

  /**
   * @returns The value of the cached data.
   */
  public removeCache(): CachedData<T> {
    this._cache = {
      isCached: false,
      expiration: null,
      value: null,
    };
    return this._cache;
  }
}

export default DataInterface;
