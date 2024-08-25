import { EditorState } from "@codemirror/state"
import { basicSetup } from "codemirror"
import { EditorView, keymap, } from "@codemirror/view"
import { json } from "@codemirror/lang-json"
import { useEffect } from "react"
import "./editor.scss"


export function createEditor() {
  console.log("test");
  let startState = EditorState.create({
    doc: "Hello World",
    extensions: [basicSetup, json()]
  })

  return new EditorView({
    state: startState,
    parent: document.getElementById("editor")!,
  })
}

export function Editor() {
  useEffect(() => {
    createEditor()
  }, [])
  return <div id="editor" className="h-100"></div>
}