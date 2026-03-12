import GoBackBtn from "../../components/GoBackBtn";
import Questions from "../profile/Questions";

function SecurityQuestion() {
  return (
    <div>
      <div className="mb-5">
        <GoBackBtn />
      </div>

      <div className="rounded-2xl border border-brand-150 p-10 ">
        <Questions />
      </div>
    </div>
  );
}

export default SecurityQuestion;
