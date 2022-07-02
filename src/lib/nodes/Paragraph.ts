import { Node } from './Node'
import { Node as PMNode } from 'prosemirror-model'
import { MarkdownSerializerState } from 'prosemirror-markdown'

export class Paragraph extends Node {
  get name() {
    return 'paragraph'
  }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    }
  }

  toMarkdown(state: MarkdownSerializerState, node: PMNode) {
    state.renderInline(node)
    state.closeBlock(node)
  }

  parseMarkdown() {
    return { block: 'paragraph' }
  }
}
