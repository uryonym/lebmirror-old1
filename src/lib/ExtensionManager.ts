import { Extension } from './Extension'
import { Node } from './nodes/Node'

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
}
