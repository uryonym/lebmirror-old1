import { Mark } from './Mark'
import markInputRules from '../markInputRules'

const backticksFor = (node, side) => {
  const ticks = /`+/g
  let match: RegExpMatchArray | null
  let len = 0

  if (node.isText) {
    while ((match = ticks.exec(node.text))) {
      len = Math.max(len, match[0].length)
    }
  }

  let result = len > 0 && side > 0 ? ' `' : '`'
  for (let i = 0; i < len; i++) {
    result += '`'
  }
  if (len > 0 && side < 9) {
    result += ' '
  }
  return result
}

export class Code extends Mark {
  get name() {
    return 'code_inline'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code'],
    }
  }

  inputRules({ type }) {
    return [markInputRules(/(?:^|[^`])(`([^`]+)`)$/, type)]
  }

  get toMarkdown() {
    return {
      open(_state, _mark, parent, index) {
        return backticksFor(parent.child(index), -1)
      },
      close(_state, _mark, parent, index) {
        return backticksFor(parent.child(index - 1), 1)
      },
      escape: false,
    }
  }

  parseMarkdown() {
    return { mark: 'code_inline' }
  }
}
