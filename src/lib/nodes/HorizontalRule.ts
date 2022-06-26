import { Node } from './Node'
import { InputRule } from 'prosemirror-inputrules'

export class HorizontalRule extends Node {
  get name() {
    return 'hr'
  }

  get schema() {
    return {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM: () => ['hr'],
    }
  }

  parseMarkdown() {
    return {
      node: 'hr',
      getAttrs: (tok) => ({
        markup: tok.markup,
      }),
    }
  }

  inputRules({ type }) {
    return [
      new InputRule(/^(?:---|___\s|\*\*\*\s)$/, (state, match, start, end) => {
        const { tr } = state

        if (match[0]) {
          const markup = match[0].trim()
          tr.replaceWith(start - 1, end, type.create({ markup }))
        }

        return tr
      }),
    ]
  }
}
