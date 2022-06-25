import { Node } from './Node'

export class Blockquote extends Node {
  get name() {
    return 'blockquote'
  }

  get schema() {
    return {
      content: 'block+',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM: () => ['blockquote', 0],
    }
  }
}
