import { Node } from './Node'

export class ListItem extends Node {
  get name() {
    return 'list_item'
  }

  get schema() {
    return {
      content: 'paragraph block*',
      defining: true,
      parseDOM: [{ tag: 'li' }],
      toDOM: () => ['li', 0],
    }
  }

  parseMarkdown() {
    return { block: 'list_item' }
  }
}
