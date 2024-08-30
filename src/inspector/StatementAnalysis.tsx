import { Accordion } from "react-bootstrap";
import usePolicyState, { Policy, Statement } from "../state.js";
import StatusBadge from "../styling/StatusBadge.js";
import actions from "../../scripts/actions.js";

const numActions = Object.keys(actions).reduce((acc, key) => acc + actions[key].length, 0);

export default function PolicyAnalysis() {
    const valid_policy_str = usePolicyState(state => state.valid_policy);
    const valid_policy: Policy = JSON.parse(valid_policy_str);
    const statements = valid_policy.Statement.map(
        (statement, index) => <StatementAnalysis key={index} id={index} statement={statement} />
    );
    return <Accordion flush>
        {statements}
    </Accordion>
}

interface StatementAnalysisProps {
    id: number;
    statement: Statement;
}

function StatementAnalysis(props: StatementAnalysisProps) {
    const sid = props.statement.Sid;
    const title = sid ? `SID: ${sid}` : `Statement #${props.id}`;
    const actions = typeof props.statement.Action === "string" ? [props.statement.Action] : props.statement.Action;
    return <Accordion.Item eventKey={String(props.id)}>
        <Accordion.Header>
            <StatusBadge variant="success" />&nbsp;{title}
        </Accordion.Header>
        <Accordion.Body>
            <p>Effect: {props.statement.Effect}</p>
            <p>
                <ActionAnalysis regex_actions={actions} />
            </p>
            <p>Resource: {props.statement.Resource}</p>
        </Accordion.Body>
    </Accordion.Item>
}

function validateRegexAction(regex_action: string) {
    if (regex_action === "*") {
        return true;
    }

    const expression = /^[a-z0-9]+:[A-Za-z0-9*]+$/;
    return expression.test(regex_action);
}
function findMatchingActions(regex_action: string) {
    const [service, verb_str] = regex_action.split(":");
    const verb_regex = new RegExp("^" + verb_str.replace(/\*/, ".*") + "$");

    if (actions[service] === undefined) {
        return [];
    }

    return actions[service].filter(verb => verb_regex.test(verb)).map(
        verb => `${service}:${verb}`
    )
}

function ActionAnalysis(props: { regex_actions: string[] }) {
    if (props.regex_actions.indexOf("*") !== -1) {
        return <>{numActions} total actions</>
    }

    const matched_actions: JSX.Element[] = [];
    const invalid_actions: JSX.Element[] = [];
    for (const regex_action of props.regex_actions) {
        if (!validateRegexAction(regex_action)) {
            invalid_actions.push(<ActionBadge action={regex_action} valid={false} />);
            continue;
        }

        findMatchingActions(regex_action).forEach(
            action => matched_actions.push(<><ActionBadge action={action} valid={true} />{" "}</>)
        );
    }

    return <>
        Invalid Actions: {invalid_actions}
        <br />
        Valid Actions: {matched_actions}

    </>
}

function ActionBadge(props: { action: string, valid?: boolean }) {
    const classes = ["rounded-pill", "py-1", "px-2", "m-1", "d-inline-block"];
    if (props.valid === false) {
        classes.push("bg-danger", "border-danger");
    } else {
        classes.push("bg-info", "border-primary");
    }
    return <div className={classes.join(" ")}>
        {props.action}
    </div>
}