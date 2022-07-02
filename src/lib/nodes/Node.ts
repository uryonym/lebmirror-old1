import { Extension } from '../Extension'
import { MarkdownSerializerState } from 'prosemirror-markdown'
import { Node as PMNode } from 'prosemirror-model'

export abstract class Node extends Extension {
  get type() {
    return 'node'
  }

  abstract get schema()

  get markdownToken(): string {
    return ''
  }

  toMarkdown(state: MarkdownSerializerState, node: PMNode) {
    console.error('toMarkdown not implemented', state, node)
  }

  parseMarkdown() {
    return
  }
}
