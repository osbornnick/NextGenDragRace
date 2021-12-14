import { useParams } from "react-router";
import { Roster } from "../../roster";
import CommentSection from "../../comment";

const Details = (props) => {
    const { id } = useParams();
    return (
        <>
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    <Roster id={id} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <CommentSection
                        parentEntityType={"rosters"}
                        parentId={id}
                    />
                </div>
            </div>
        </>
    );
};

export default Details;
