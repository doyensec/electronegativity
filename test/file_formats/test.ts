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

export abstract class Type2 {
  public abstract cloneStroked(): Type3;

  public static mutatePartners(aaa: Type2): undefined {
    const x = aaa as Type1;
    return undefined;
  }
}


// Still not able to parse code below:

// declare var React: typeof import("react");

// declare namespace MyNamespaceX {
//   type Element = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {class: string, children: any};
// }

// Error: Unexpected token
//const shift = axisOrder as number <= 2 ? 1 : 2;