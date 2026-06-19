export class LegendValue {
  _val: string[];

  get val(): string[] {
    return this._val;
  }

  constructor(val: string[]) {
    if (val.length != 1 && val.length != 4)
      throw Error("ラベルの個数が不正です");

    this._val = val;
  }

  equals(other: LegendValue): boolean {
    return JSON.stringify(this) == JSON.stringify(other);
  }
}
