import { Accordion } from "react-bootstrap";
import usePolicyState, { Policy, Statement } from "../state.js";
import StatusBadge from "../styling/StatusBadge.js";

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
    return <Accordion.Item eventKey={String(props.id)}>
        <Accordion.Header>
            <StatusBadge variant="success" />&nbsp;{title}
        </Accordion.Header>
        <Accordion.Body>
            <p>Effect: {props.statement.Effect}</p>
            <p>Action: {props.statement.Action}</p>
            <p>Resource: {props.statement.Resource}</p>
        </Accordion.Body>
    </Accordion.Item>
}