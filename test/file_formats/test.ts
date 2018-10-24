(async () => {
  (await import("./electron")).default;
})();

export namespace MyNamespace1 {
  export class Params {
    public readonly type: Type;
  }
}

export namespace MyNamespace2 {
  export class Params {
    public readonly type: Type;
  }
}