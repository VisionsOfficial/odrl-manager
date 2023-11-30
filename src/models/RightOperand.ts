import { PolicyValidator } from 'PolicyValidator';

export class RightOperand extends PolicyValidator {
  public value: string | number;

  constructor(value: string | number) {
    super();
    this.value = value;
  }

  public async verify(): Promise<boolean> {
    return true;
  }
}
