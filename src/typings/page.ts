import {PageFullType} from '@tager/web-modules';

export interface Page<T> extends PageFullType {
  template: {
    name: string;
    fields: T
  };
}
