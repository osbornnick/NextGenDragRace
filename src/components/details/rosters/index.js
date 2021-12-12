import { useParams } from "react-router";
import { Roster } from "../../roster";

const Details = (props) => {
    const { id } = useParams();
    return (
        <div className="row">
            <div className="col d-flex justify-content-center">
                <Roster id={id} />
            </div>
        </div>
    );
};

export default Details;
