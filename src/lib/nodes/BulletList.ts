import { Node } from './Node'
import { wrappingInputRule } from 'prosemirror-inputrules'

export class BulletList extends Node {
  get name() {
    return 'bullet_list'
  }

  get schema() {
    return {
      content: 'list_item+',
      group: 'block',
      parseDOM: [{ tag: 'ul' }],
      toDOM: () => ['ul', 0],
    }
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*([-+*])\s$/, type)]
  }

  parseMarkdown() {
    return { block: 'bullet_list' }
  }
}
