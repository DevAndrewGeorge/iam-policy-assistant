import usePolicyState from "../state.js";

export default function CharacterCounter() {
    const policy = usePolicyState(state => state.policy);
    const results = [
        { maximum: parseInt(process.env.APP_AWS_MAX_POLICY_LENGTH_MANAGED_POLICY!), resource_name: "managed policy" },
        { maximum: parseInt(process.env.APP_AWS_MAX_POLICY_LENGTH_USER_INLINE_POLICY!), resource_name: "user inline policy" },
        { maximum: parseInt(process.env.APP_AWS_MAX_POLICY_LENGTH_ROLE_INLINE_POLICY!), resource_name: "role inline policy" },
        { maximum: parseInt(process.env.APP_AWS_MAX_POLICY_LENGTH_GROUP_INLINE_POLICY!), resource_name: "group inline policy" }
    ].map(
        ({ maximum, resource_name }) => <div><CharacterCounterBadge length_actual={policy.length} length_maximum={maximum} resource_name={resource_name} /></div>
    )

    return <div>{results}</div>
}

interface CharacterCounterBadgeProps {
    length_actual: number;
    length_maximum: number;
    resource_name: string;
}

function CharacterCounterBadge(props: CharacterCounterBadgeProps) {
    const positive_icon = <i className="bi bi-check-circle-fill text-success"></i>;
    const negative_icon = <i className="bi bi-x-circle-fill text-danger"></i>;

    return <span>
        {props.length_actual <= props.length_maximum ? positive_icon : negative_icon}
        {" "}
        {props.length_actual <= props.length_maximum ? "" : "in"}valid number of characters for a {props.resource_name}
    </span>
}