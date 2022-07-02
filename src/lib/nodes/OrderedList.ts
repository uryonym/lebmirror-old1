import { Node } from './Node'
import { wrappingInputRule } from 'prosemirror-inputrules'

export class OrderedList extends Node {
  get name() {
    return 'ordered_list'
  }

  get schema() {
    return {
      attrs: {
        order: {
          default: 1,
        },
      },
      content: 'list_item+',
      group: 'block',
      parseDOM: [
        {
          tag: 'ol',
          getAttrs: (dom: HTMLOListElement) => ({
            order: dom.hasAttribute('start') ? parseInt(dom.getAttribute('start') || '1', 10) : 1,
          }),
        },
      ],
      toDOM: (node) => (node.attrs.order === 1 ? ['ol', 0] : ['ol', { start: node.attrs.order }, 0]),
    }
  }

  inputRules({ type }) {
    return [
      wrappingInputRule(
        /^(\d+)\.\s$/,
        type,
        (match) => ({ order: +match[1] }),
        (match, node) => node.childCount + node.attrs.order === +match[1],
      ),
    ]
  }

  parseMarkdown() {
    return {
      block: 'ordered_list',
      getAttrs: (tok) => ({
        order: parseInt(tok.attrGet('start') || '1', 10),
      }),
    }
  }
}
