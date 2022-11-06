import DataInputVariant from './DataInputVariant';

export type DataInput<T> = {
  isInputOpened: boolean;
  inputValue: T | null;
  inputVariant: DataInputVariant;
}

export default DataInput;
