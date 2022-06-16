import { useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from 'prosemirror-schema-basic'

const LebEditor = () => {
  const pmEditor = useRef<HTMLDivElement>(null)

  const createState = () => {
    return EditorState.create({
      schema,
    })
  }

  const createView = () => {
    if (!pmEditor.current) {
      throw new Error('createView called before ref available')
    }

    return new EditorView(pmEditor.current, {
      state: createState(),
    })
  }

  useEffect(() => {
    console.log('init editor')
    console.log(pmEditor.current)
    createView()
  }, [])

  return <div ref={pmEditor} />
}

export default LebEditor
