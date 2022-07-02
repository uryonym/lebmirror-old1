import { Mark } from './Mark'

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

  parseMarkdown() {
    return { mark: 'strong' }
  }
}
