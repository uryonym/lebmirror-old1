import { Mark } from './Mark'
import markInputRules from '../markInputRules'
import { toggleMark } from 'prosemirror-commands'

export class Bold extends Mark {
  get name() {
    return 'strong'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'b' }, { tag: 'strong' }, { style: 'font-style', getAttrs: (value) => value === 'bold' }],
      toDOM: () => ['strong'],
    }
  }

  inputRules({ type }) {
    return [markInputRules(/(?:\*\*)([^*]+)(?:\*\*)$/, type)]
  }

  keys({ type }) {
    return {
      'Mod-b': toggleMark(type),
      'Mod-B': toggleMark(type),
    }
  }

  get toMarkdown() {
    return {
      open: '**',
      close: '**',
      mixable: true,
      expelEnclosingWhitespace: true,
    }
  }

  parseMarkdown() {
    return { mark: 'strong' }
  }
}
