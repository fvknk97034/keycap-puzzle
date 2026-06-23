import { JisKeyboardEntity } from "./keyboard/JisKeyboardEntity";
import type { IKeyboardEntity } from "./keyboard/IKeyboardEntity";
import type { CapEntity } from "./cap/CapEntity";
import { SlotEntity } from "./slot/SlotEntity";

export class Game {
  readonly _keyboardType: string = JisKeyboardEntity.KEYBOARD_TYPE;
  private readonly _correctKeyboard: IKeyboardEntity = new JisKeyboardEntity({
    isCorrect: true,
  });
  private _keyboard: IKeyboardEntity = new JisKeyboardEntity({});
  private _caps: CapEntity[] = [];

  get keyboardType() {
    return this._keyboardType;
  }

  get keyboard() {
    return this._keyboard;
  }

  get caps() {
    return this._caps;
  }

  constructor(keyboardType = "JIS") {
    this._keyboardType = keyboardType;
    this._caps = this.keyboard.shuffleCaps();
  }

  updateKeyboard(slot: SlotEntity, cap: CapEntity | null) {
    const slottedCap = slot.cap;
    slot.cap = cap;

    if (cap) {
      this._caps = this._caps.filter((c) => c !== cap);
    } else {
      this.caps.push(slottedCap!);
    }
  }

  canFinish(): boolean {
    return this.caps.length == 0;
  }

  isCompleted(): boolean {
    if (!this.canFinish()) return false;
    return this.keyboard.equals(this._correctKeyboard);
  }
}
