import DataInputVariant from './DataInputVariant';

export interface DataInput<T> {
  isInputOpened: boolean;
  inputValue: T | null;
  inputVariant: DataInputVariant;
}

export default DataInput;
