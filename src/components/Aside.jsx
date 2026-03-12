import { HiCheckCircle, HiMiniUsers } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { COMPLETED_STATUS } from "../constants/helper";

function Aside({ data, basePath, kycStatus }) {
  return (
    <aside
      className="
    w-full md:w-2/6
    personalBg
    md:min-h-screen
   md:rounded-l-[2rem]
    overflow-hidden rounded-t-[2rem] md:rounded-none
  "
    >
      <ul
        className="
    flex md:block
    overflow-x-auto md:overflow-visible
    whitespace-nowrap
    gap-6
    px-4 py-4 md:py-10
    scrollbar-hide list-style
  "
      >
        {data.map((item, index) => {
          const statusValue = kycStatus?.[item.key];
          const isCompleted = statusValue === COMPLETED_STATUS;

          return (
            <li key={item.key} className="flex-shrink-0 md:block">
              <NavLink
                to={isCompleted ? "#" : `${basePath}/${item.path}`}
                onClick={(e) => isCompleted && e.preventDefault()}
                className={({ isActive }) =>
                  `
    step-item
    flex items-center gap-3
    min-w-[180px] md:min-w-0
    ${isActive ? "active font-semibold" : "text-brand-150"}
    ${isCompleted ? "cursor-not-allowed opacity-60 text-black font-semibold" : ""}
    `
                }
              >
                {/* STEP CIRCLE */}
                <div
                  className={`
                    ${isCompleted ? "step-circle-completed" : "step-circle"}
                  `}
                >
                  {isCompleted ? (
                    <HiCheckCircle
                      color="var(--color-brand-green-100)"
                      size={22}
                    />
                  ) : (
                    <HiMiniUsers color="#fff" />
                  )}
                </div>

                {/* STEP TITLE */}
                <div>
                  <p className="text-xs font-medium">STEP {index + 1}</p>

                  <p className="text-sm">{item.title}</p>
                </div>
              </NavLink>
              {index !== data.length - 1 && (
                <p className="hidden md:block h-10 w-2 border-l border-brand-150 ml-4 my-[1rem]" />
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Aside;
