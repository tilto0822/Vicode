import { BaseCategory } from './BaseCategory';

export class CategoryManager {
  private _categoryArr: Array<BaseCategory>;

  constructor() {
    this._categoryArr = [];
  }

  public get categoryArr(): Array<BaseCategory> {
    return this._categoryArr;
  }

  public addCategory(category: BaseCategory): BaseCategory {
    this._categoryArr.push(category);
    return category;
  }

  public removeCategory(categoryId: string): boolean {
    const index = this._categoryArr.findIndex((item) => item.key === categoryId);
    if (index !== -1) {
      this._categoryArr.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default CategoryManager;
