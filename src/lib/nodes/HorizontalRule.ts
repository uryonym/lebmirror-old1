import { Node } from './Node'

export class HorizontalRule extends Node {
  get name() {
    return "horizontal_rule"
  }

  get schema() {
    return {
      group: "block",
      parseDOM: [{tag: "hr"}],
      toDOM: () => ["hr"]
    }
  }
}
