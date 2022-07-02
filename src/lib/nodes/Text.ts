import { Node } from './Node'
import { Node as PMNode } from 'prosemirror-model'
import { MarkdownSerializerState } from 'prosemirror-markdown'

export class Text extends Node {
  get name() {
    return 'text'
  }

  get schema() {
    return {
      group: 'inline',
    }
  }

  toMarkdown(state: MarkdownSerializerState, node: PMNode) {
    state.text(node.text)
  }
}
