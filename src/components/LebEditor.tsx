import { DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js'
import { useCallback, useState } from 'react'
import 'draft-js/dist/Draft.css'

const LebEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty())

  const handleKeyCommand = useCallback((command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }, [])

  return <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} />
}

export default LebEditor
