import BaseNode from '../node/BaseNode';

export class BaseCategory {
  private _key: string;
  private _color: string;
  private _nodeArr: Array<BaseNode>;

  constructor(key: string, color: string) {
    this._key = key;
    this._color = color;
    this._nodeArr = [];
  }

  public get key(): string {
    return this._key;
  }

  public get color(): string {
    return this._color;
  }

  public get nodeArr(): Array<BaseNode> {
    return this._nodeArr;
  }

  public addNode(node: BaseNode): BaseNode {
    this._nodeArr.push(node);
    return node;
  }

  public removeNode(nodeKey: string): boolean {
    const index = this._nodeArr.findIndex((item) => item.id === nodeKey);
    if (index !== -1) {
      this._nodeArr.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default BaseCategory;
