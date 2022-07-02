import { Extension } from '../Extension'
import { history, redo, undo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'

export class History extends Extension {
  get name() {
    return 'history'
  }

  keys() {
    return {
      'Mod-z': undo,
      'Mod-y': redo,
      'Shift-Mod-z': redo,
      Backspace: undoInputRule,
    }
  }

  get plugins() {
    return [history()]
  }
}
