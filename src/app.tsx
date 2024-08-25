import { createRoot } from "react-dom/client";
import { Editor } from "./editor";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Inspector } from "./inspector.js";

function App() {
    return <Row className="vw-100 vh-100">
        <Col>
            < Editor />
        </Col>
        <Col>
            <Inspector />
        </Col>
    </Row>
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);