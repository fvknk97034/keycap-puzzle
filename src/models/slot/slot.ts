import { Cap } from '../cap/cap'

interface Props {
  width: number
  height: number
  colStart?: number | null
  cap?: Cap | null
  fixed?: boolean
}

export class Slot {
  _width: number
  _height: number
  _colStart: number | null
  _cap: Cap | null
  _fixed: boolean

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get colStart() {
    return this._colStart
  }

  get cap() {
    return this._cap
  }

  get fixed() {
    return this._fixed
  }

  get bounds() {
    return {
      width: this.width,
      height: this.height,
      colStart: this.colStart
    }
  }

  get grid() {
    return {
      gridColumnEnd: `span ${this.width}`,
      gridRowEnd: `span ${this.height}`,
      ...(this.colStart ? { gridColumnStart: `${this.colStart}` } : {})
    }
  }

  set cap(cap) {
    this._cap = cap
  }

  constructor({ width, height, colStart = null, cap = null, fixed = false }: Props) {
    this._width = width
    this._height = height
    this._colStart = colStart
    this._cap = cap
    this._fixed = fixed
  }

  canSet(cap: Cap): boolean {
    return this.width === cap.width && this.height === cap.height
  }
}
