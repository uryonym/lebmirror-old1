import { InputRule } from 'prosemirror-inputrules'
import { Plugin } from 'prosemirror-state'

export class Extension {
  options: Record<string, any>

  constructor() {
    this.options = {
      ...this.defaultOptions,
    }
  }

  get type() {
    return 'extension'
  }

  get name() {
    return ''
  }

  get plugins(): Plugin[] {
    return []
  }

  keys(options) {
    return {}
  }

  inputRules(options): InputRule[] {
    return []
  }

  get defaultOptions() {
    return {}
  }
}
