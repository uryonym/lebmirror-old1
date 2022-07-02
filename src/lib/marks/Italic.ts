import { Mark } from './Mark'

export class Italic extends Mark {
  get name() {
    return 'em'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style', getAttrs: (value) => value === 'italic' }],
      toDOM: () => ['em'],
    }
  }

  parseMarkdown() {
    return { mark: 'em' }
  }
}
