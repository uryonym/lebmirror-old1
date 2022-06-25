import { Node } from './Node'

export class Text extends Node {
  get name() {
    return 'text'
  }

  get schema() {
    return {
      group: 'inline',
    }
  }
}
