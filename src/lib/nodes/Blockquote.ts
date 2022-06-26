import { Node } from './Node'
import { wrappingInputRule } from 'prosemirror-inputrules'

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

  parseMarkdown() {
    return { block: 'blockquote' }
  }

  inputRules({ type }) {
    return [wrappingInputRule(/^\s*>\s$/, type)]
  }
}
