import { Node } from './Node'

export class HardBreak extends Node {
  get name() {
    return 'br'
  }

  get schema() {
    return {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM: () => ['br'],
    }
  }

  parseMarkdown() {
    return { node: 'br' }
  }
}
