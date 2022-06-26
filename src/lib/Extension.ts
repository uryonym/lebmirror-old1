import { InputRule } from 'prosemirror-inputrules'

export class Extension {
  options: Record<string, any>

  constructor() {
    this.options = {
      ...this.defaultOptions
    }
  }

  get type() {
    return 'extension'
  }

  get name() {
    return ''
  }

  inputRules(options): InputRule[] {
    return []
  }

  get defaultOptions() {
    return {}
  }
}
