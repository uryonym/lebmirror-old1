import { Node } from './Node'

export class HardBreak extends Node {
  get name() {
    return 'hard_break'
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
}
