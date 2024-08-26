import { Alert } from "react-bootstrap";
import usePolicyState from "../state.js"

export default function SyntaxValidator() {
    const policy = usePolicyState(state => state.policy)
    const positive_icon = <i className="bi bi-check-circle-fill text-success"></i>;
    const negative_icon = <i className="bi bi-x-circle-fill text-danger"></i>;
    const policy_is_valid = validatePolicy(policy);
    const icon = validatePolicy(policy) ? positive_icon : negative_icon;
    return <Alert variant={policy_is_valid ? "success" : "danger"}>
        {icon} {policy_is_valid ? "valid" : "invalid"} policy syntax
    </Alert>

    if (validatePolicy(policy)) {
        return <span>{positive_icon} valid policy syntax</span>
    } else {
        return <span>{negative_icon} invalid policy syntax</span>
    }
}

function validatePolicy(policy: string): boolean {
    if (policy === "") {
        return false;
    }

    try {
        JSON.parse(policy)
        return true
    } catch (_) {
        return false
    }
}