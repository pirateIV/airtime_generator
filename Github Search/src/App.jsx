import { useEffect, useState } from "react";
import { getRepositories, getUser } from "./services/githubService";

const USER = "";

const App = () => {
  const [githubUser, setGithubUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const [activeTab, setActiveTab] = useState("repositories");

  useEffect(() => {
    const init = async () => {
      const user = await getUser(USER);
      const repos = await getRepositories(USER);

      setGithubUser(user);
      setRepositories(repos);
    };
    init();
  }, []);
  console.log(githubUser);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-2 sm:px-6 lg:px-8">
      <h1 className="text-5xl">Github User Profile</h1>

      <section className="mt-7">
        <div className="flex flex-col gap-5 ">
          <div>
            <img
              width="224"
              height="224"
              className="size-56 rounded-full shadow-lg"
              src={
                "https://github.githubassets.com/images/gravatars/gravatar-user-420.png?size=40"
              }
              alt="github user avatar"
            />
          </div>
          <div>
            <h1 className="font-semibold text-4xl">{githubUser?.name}</h1>
            <a
              href={`github.com/${githubUser?.login}`}
              className="text-indigo-600 text-sm font-medium mt-2 hover:underline"
            >
              @{githubUser?.login}
            </a>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-1.5">
              {/* prettier-ignore */}
              <svg text="muted" className="fill-gray-400" aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-people">
               <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
              </svg>
              <div>
                <span className="font-semibold">{githubUser?.followers}</span>{" "}
                <span className="text-slate-500">followers</span>
              </div>
            </div>
            <span className="text-gray-500">&middot;</span>
            <div>
              <span className="font-semibold">{githubUser?.following}</span>{" "}
              <span className="text-slate-500">following</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 w-full">
        <div className="flex items-center justify-center max-w-xs bg-gray-100 rounded-lg">
          <button onClick={() => setActiveTab("repositories")}>
            Repositories
          </button>
          <button onClick={() => setActiveTab("followers")}>Followers</button>
          <button onClick={() => setActiveTab("following")}>Following</button>
        </div>

        {activeTab === "repositories" && <div></div>}
        {activeTab === "followers" && <div></div>}
        {activeTab === "following" && <div></div>}
      </section>
    </div>
  );
};

export default App;
