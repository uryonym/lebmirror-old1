import { Node } from './Node'
import { Node as PMNode } from 'prosemirror-model'
import { textblockTypeInputRule } from 'prosemirror-inputrules'
import { MarkdownSerializerState } from 'prosemirror-markdown'

export class CodeBlock extends Node {
  get name() {
    return 'code_block'
  }

  get schema() {
    return {
      content: 'text*',
      group: 'block',
      code: true,
      defining: true,
      marks: '',
      attrs: { params: { default: '' } },
      parseDOM: [
        {
          tag: 'pre',
          preserveWhitespace: 'full',
          getAttrs: (node) => ({
            params: (node as HTMLElement).getAttribute('data-params') || '',
          }),
        },
      ],
      toDOM: (node) => ['pre', node.attrs.params ? { 'data-params': node.attrs.params } : {}, ['code', 0]],
    }
  }

  inputRules({ type }) {
    return [textblockTypeInputRule(/^```$/, type)]
  }

  toMarkdown(state: MarkdownSerializerState, node: PMNode) {
    state.write('```' + (node.attrs.params || '') + '\n')
    state.text(node.textContent, false)
    state.ensureNewLine()
    state.write('```')
    state.closeBlock(node)
  }

  parseMarkdown() {
    return {
      block: 'code_block',
      noCloseToken: false,
    }
  }
}
