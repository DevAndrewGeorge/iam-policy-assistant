import { json } from "@codemirror/lang-json"
import "./editor.scss"
import usePolicyState from "./state.js"
import ReactCodeMirror from "@uiw/react-codemirror"

export function Editor() {
  const [policy, setPolicy] = usePolicyState(state => [state.policy, state.updatePolicy])
  return <ReactCodeMirror
    value={policy}
    onChange={(value) => setPolicy(value)}
    extensions={[json()]}
    className="h-100 vh-100"
  />
}