interface Initiable {
  init?(): void;
}

class Bidello {
  data: { [key: string]: any };
  listeners: { [key: string]: Function[] };
  fireAtStart: { [key: string]: boolean };
  instances: any[];

  constructor() {
    this.data = {};
    this.listeners = {};
    this.fireAtStart = {};
    this.instances = [];
  }

  on(e: string, f: Function) {
    this.listeners[e] = this.listeners[e] || [];
    this.listeners[e].push(f);
  }

  off(e: string, f: Function) {
    if (!(e in this.listeners)) {
      return;
    }

    const index = this.listeners[e].indexOf(f);
    if (index > -1) {
      this.listeners[e].splice(index, 1);
    }
  }

  register(instance: any) {
    this.instances.push(instance);

    for (let k in this.fireAtStart) {
      this.fireMethod(instance, k);
    }
  }

  unregister(instance: any) {
    const index = this.instances.indexOf(instance);

    if (index > -1) {
      this.instances.splice(index, 1);
    }
  }

  nameToMethod(n: string) {
    return `on${n.charAt(0).toUpperCase() + n.slice(1)}`;
  }

  fireMethod(instance: any, name: string) {
    const method = instance[this.nameToMethod(name)];

    if (typeof method === "function") {
      method.call(instance, this.data[name]);
    }
  }

  trigger(
    {
      name,
      fireAtStart = false,
      log = false,
    }: {
      name: string;
      fireAtStart?: boolean;
      log?: boolean;
    },
    data: any = {},
  ) {
    this.data[name] = data;

    if (fireAtStart) {
      this.fireAtStart[name] = true;
    }

    if (log) {
      console.log(`👨‍🏫 ${name} – ${data}`);
    }

    if (name in this.listeners) {
      for (let i = 0; i < this.listeners[name].length; i++) {
        this.listeners[name][i].call(this, data);
      }
    }

    this.instances.forEach((instance) => this.fireMethod(instance, name));
  }
}

const bidelloSingleton = new Bidello();

const component = <T extends { new(...args: any[]): {} }>(superclass: T) =>
  class extends superclass {
    [x: string]: any;
    _args: any[];

    constructor(...args: any[]) {
      super(...args);
      this._args = args;
      this.init && this.init();
      bidelloSingleton.register(this);
    }

    destroy() {
      bidelloSingleton.unregister(this);
    }
  };

export { component };
export default bidelloSingleton;
