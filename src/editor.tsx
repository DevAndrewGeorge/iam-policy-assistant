import { EditorState } from "@codemirror/state"
import { basicSetup } from "codemirror"
import { EditorView, keymap, } from "@codemirror/view"
import { json } from "@codemirror/lang-json"

export function createEditor() {
  let startState = EditorState.create({
    doc: "Hello World",
    extensions: [basicSetup, json()]
  })

  return new EditorView({
    state: startState,
    parent: document.body
  })
}