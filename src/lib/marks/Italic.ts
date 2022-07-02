import { Mark } from './Mark'
import markInputRules from '../markInputRules'
import { toggleMark } from 'prosemirror-commands'

export class Italic extends Mark {
  get name() {
    return 'em'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style', getAttrs: (value) => value === 'italic' }],
      toDOM: () => ['em'],
    }
  }

  inputRules({ type }) {
    return [markInputRules(/(?:^|[\s])(_([^_]+)_)$/, type), markInputRules(/(?:^|[^*])(\*([^*]+)\*)$/, type)]
  }

  keys({ type }) {
    return {
      'Mod-i': toggleMark(type),
      'Mod-I': toggleMark(type),
    }
  }

  get toMarkdown() {
    return {
      open: '*',
      close: '*',
      mixable: true,
      expelEnclosingWhitespace: true,
    }
  }

  parseMarkdown() {
    return { mark: 'em' }
  }
}
