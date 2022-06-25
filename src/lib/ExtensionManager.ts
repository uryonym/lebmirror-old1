import { Extension } from './Extension'
import { Node } from './nodes/Node'
import { Mark } from './marks/Mark'

export class ExtensionManager {
  extensions: Extension[]

  constructor(extensions: Extension[] = []) {
    this.extensions = extensions
  }

  get nodes() {
    return this.extensions
      .filter((extension) => extension.type === 'node')
      .reduce(
        (nodes, node: Node) => ({
          ...nodes,
          [node.name]: node.schema,
        }),
        {},
      )
  }

  get marks() {
    return this.extensions
      .filter((extension) => extension.type === 'mark')
      .reduce(
        (marks, mark: Mark) => ({
          ...marks,
          [mark.name]: mark.schema,
        }),
        {},
      )
  }
}
