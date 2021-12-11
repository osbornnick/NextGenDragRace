import { useParams } from "react-router";
import { Roster } from "../../roster";

const Details = (props) => {
    const { id } = useParams();
    return (
        <>
            <Roster id={id} />
        </>
    );
};

export default Details;
