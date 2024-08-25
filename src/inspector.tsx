import usePolicyState from "./state.js";
import { useState } from "react";
import CharacterCounter from "./inspector/CharacterCounter.js";

export function Inspector() {
    const policy = usePolicyState(state => state.policy);
    const [statements, setStatements] = useState(0); // This is a bug, we should use usePolicyState instead of useState

    try {
        const numStatements = JSON.parse(policy).Statement.length;
        if (numStatements !== statements) {
            setStatements(numStatements);
        }
    } catch (_) { }
    return <>
        Inspector.
        <CharacterCounter />
        <br />
        Number of statements: {statements}
    </>;
}