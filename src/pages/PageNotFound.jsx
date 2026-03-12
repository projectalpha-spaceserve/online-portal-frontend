import { useMoveBack } from "../hooks/useMoveBack";
import notFound from "../assets/icons/notFound.svg";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen flex justify-center items-center p-16">
      <div className="text-center w-full">
        <div className="flex items-center justify-center mb-5">
          <img src={notFound} className="max-h-[220px] w-auto" />
        </div>
        <h1 className="text-md mb-5">
          The page you are looking for could not be found
        </h1>
        <button
          className="bg-[#a22228] text-white text-sm px-8 py-2 rounded-md"
          onClick={moveBack}
        >
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
