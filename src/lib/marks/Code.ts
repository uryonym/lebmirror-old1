import { Mark } from './Mark'

export class Code extends Mark {
  get name() {
    return 'code'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'code' }],
      toDOM: () => ['code', 0],
    }
  }
}
