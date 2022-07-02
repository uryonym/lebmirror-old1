import { Extension } from '../Extension'

export abstract class Mark extends Extension {
  get type() {
    return 'mark'
  }

  abstract get schema()

  get markdownToken(): string {
    return ''
  }

  get toMarkdown(): Record<string, any> {
    return {}
  }

  parseMarkdown() {
    return
  }
}
