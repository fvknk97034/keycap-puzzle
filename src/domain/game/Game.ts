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

  private _inPlaying: boolean = false;

  private _startMs: number | null = null;
  private _endMs: number | null = null;

  get keyboardType() {
    return this._keyboardType;
  }

  get keyboard() {
    return this._keyboard;
  }

  get caps() {
    return this._caps;
  }

  get inPlaying() {
    return this._inPlaying;
  }

  get startMs() {
    return this._startMs;
  }

  get endMs() {
    return this._endMs;
  }

  private set caps(caps) {
    this._caps = caps;
  }

  private set inPlaying(inPlaying) {
    this._inPlaying = inPlaying;
  }

  private set startMs(startMs) {
    this._startMs = startMs;
  }

  private set endMs(endMs) {
    this._endMs = endMs;
  }

  constructor(keyboardType = "JIS") {
    this._keyboardType = keyboardType;
  }

  start(): void {
    this.startMs = Date.now();
    this.caps = this.keyboard.shuffleCaps();
    this.inPlaying = true;
  }

  finish(): void {
    if (!this.canFinish()) return;

    this.endMs = Date.now();
    this.inPlaying = false;
  }

  elapsedMs(): number {
    if (!this.startMs) return 0;
    if (this.endMs) return this.endMs - this.startMs;

    return Date.now() - this.startMs;
  }

  updateKeyboard(slot: SlotEntity, cap: CapEntity | null): void {
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
