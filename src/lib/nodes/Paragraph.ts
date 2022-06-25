import { Node } from './Node'

export class Paragraph extends Node {
  get name() {
    return 'paragraph'
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDom: () => ['p', 0],
    }
  }
}
