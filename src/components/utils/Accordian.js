import { useState } from "react";

const Accordian = (props) => {
    const { name, list, mapFunction } = props;
    const [caret, setCaret] = useState("down");
    const toggleCaret = () => {
        setCaret(caret === "down" ? "up" : "down");
    };
    return (
        <>
            <ul className="list-group">
                <li
                    className="list-group-item list-group-item-action d-flex align-items-center justify-content-between rounded"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#" + removeSpaces(name)}
                    onClick={() => toggleCaret()}
                >
                    <h5 className="mb-0">{name}</h5>
                    <i className={"fas fa-chevron-" + caret}></i>
                </li>
                <div className="collapse" id={removeSpaces(name)}>
                    {list.map(mapFunction)}
                </div>
            </ul>
        </>
    );
};

const removeSpaces = (string) => string.replace(/\s/g, "");

export default Accordian;
