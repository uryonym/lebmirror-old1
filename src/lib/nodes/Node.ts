import { Extension } from '../Extension'

export abstract class Node extends Extension {
  get type() {
    return 'node'
  }

  abstract get schema()
}