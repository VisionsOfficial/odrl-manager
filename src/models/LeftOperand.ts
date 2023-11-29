import { DebugMonitor } from 'DebugMonitor';

export class LeftOperand extends DebugMonitor {
  private value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public async evaluate(): Promise<string | number | null> {
    // tmp testing purpose
    if (this.value === 'age') {
      return 21;
    }
    return null;
  }
}
