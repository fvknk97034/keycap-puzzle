import type { CapProps } from './interface/capProps'

export class Cap {
  _labels: string[]
  _width: number
  _height: number
  _colStart: number | null
  _fixed: boolean

  BASE_WIDTH: number = 4
  BASE_HEIGHT: number = 1

  get labels() {
    return this._labels
  }

  get width() {
    return this._width
  }

  get height() {
    return this._height
  }

  get colStart() {
    return this._colStart
  }

  get fixed() {
    return this._fixed
  }

  get grid() {
    return {
      ...this.trayGrid,
      ...(this.colStart ? { gridColumnStart: `${this.colStart}` } : {})
    }
  }

  get trayGrid() {
    return {
      gridColumnEnd: `span ${this.width}`,
      gridRowEnd: `span ${this.height}`
    }
  }

  get bounds() {
    return {
      width: this.width,
      height: this.height,
      colStart: this.colStart
    }
  }

  constructor({ labels, width = this.BASE_WIDTH, height = this.BASE_HEIGHT, colStart = null, fixed = false }: CapProps) {
    this._labels = labels
    this._width = width
    this._height = height
    this._colStart = colStart
    this._fixed = fixed
  }

  equals(other: Cap) {
    return JSON.stringify(this.labels) == JSON.stringify(other.labels)
  }

  isSingleFunction() {
    return this.labels.length == 1
  }
}
