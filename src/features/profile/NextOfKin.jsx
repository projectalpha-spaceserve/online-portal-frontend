import Spinner from "../../components/Spinner";
import { useNok } from "../get-started/kyc/useNok";
import { useRelation } from "../utils/useRelation";

function NextOfKin() {
  const { isNokPending, nok } = useNok();
  const { relation } = useRelation();

  const selectedRelationship = relation.find(
    (item) => item.RELATIONSHIP_CD === nok?.relationship,
  );

  const relationshipName = selectedRelationship?.RELATIONSHIP_DSC || "";

  if (isNokPending) {
    return <Spinner />;
  }
  return (
    <div className="py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-brand-75 p-5 rounded-2xl">
        <div className="">
          <h2 className="text-xs text-brand-200">First name:</h2>
          <p className="text-xs font-medium">{nok?.firstname}</p>
        </div>
        <div className="">
          <h2 className="text-xs text-brand-200">Last name:</h2>
          <p className="text-xs font-medium">{nok?.lastname}</p>
        </div>

        <div className="">
          <h2 className="text-xs text-brand-200">Gender:</h2>
          <p className="text-xs font-medium capitalize">{nok?.gender}</p>
        </div>
        <div className="">
          <h2 className="text-xs text-brand-200">Email</h2>
          <p className="text-xs font-medium">{nok?.email}</p>
        </div>
        <div className="">
          <h2 className="text-xs text-brand-200">Phone Number:</h2>
          <p className="text-xs font-medium">{nok?.telephone}</p>
        </div>
        <div className="">
          <h2 className="text-xs text-brand-200">Relationship</h2>
          <p className="text-xs font-medium">{relationshipName}</p>
        </div>

        <div>
          <h2 className="text-xs text-brand-200">Address:</h2>
          <p className="text-xs font-medium">{nok?.address_street}</p>
        </div>

        <div>
          <h2 className="text-xs text-brand-200">Country:</h2>
          <p className="text-xs font-medium">{nok?.address_country}</p>
        </div>
      </div>
    </div>
  );
}

export default NextOfKin;
