function Booktitle(props) {
    return (
        <div>{props.title}</div>
        // <div>{props.children}</div> - childrenként így működik
    )
}

export default function Book(props) {
    // return <Booktitle>{props.title}</Booktitle>;
    return <Booktitle title={props.title} />;
}
