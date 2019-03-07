import { BaseObjectConfig } from './base-object-config';

export class TextboxObject extends BaseObjectConfig<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
