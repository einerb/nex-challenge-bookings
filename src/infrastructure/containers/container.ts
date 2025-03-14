export class Container {
  private instances = new Map();

  register<T>(key: string, instance: T): void {
    this.instances.set(key, instance);
  }

  resolve<T>(key: string): T {
    const instance = this.instances.get(key);

    if (!instance) {
      throw new Error(`No instance found for key: ${key}`);
    }
    return instance as T;
  }

  getRegisteredKeys(): string[] {
    return Array.from(this.instances.keys());
  }
}
