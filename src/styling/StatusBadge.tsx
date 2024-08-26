export default function StatusBadge(props: { variant: "success" | "danger" | "warning" }) {
    const classes = ["bi"];
    switch (props.variant) {
        case "success":
            classes.push("bi-check-circle-fill");
            classes.push("text-success");
            break;
        case "danger":
            classes.push("bi-x-circle-fill");
            classes.push("text-danger");
            break;
        case "warning":
            classes.push("bi-exclamation-circle-fill");
            classes.push("text-warning");
            break;
    }
    return <i className={classes.join(" ")}></i>;
}