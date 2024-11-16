import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const token = import.meta.env.VITE_GITHUB_API_TOKEN;

const BASE_URL = "https://api.github.com/users";

// Service functions
const getUser = async (user) => {
  const res = await fetch(`${BASE_URL}/${user}`, {
    headers: {
      Authorization: "token " + token,
    },
  });
  return await res.json();
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [githubUser, setGithubUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const [user] = await Promise.all([getUser("jane-does-coding")]);

        setGithubUser(user);
      } catch (error) {
        console.error("error fetching github data:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <Loader2 className="size-7 animate-spin text-indigo-600" />
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-4xl">Github User Search</h1>
      </header>

      <div className="mt-8">
        <section className="flex flex-col md:flex-row gap-8">
          {/* Profile Header */}
          <div className="flex-shrink-0">
            <img
              src={
                githubUser?.avatar_url ||
                "https://github.githubassets.com/images/gravatars/gravatar-user-420.png"
              }
              alt="github user avatar"
              className="size-48 ring-4 ring-gray-100 rounded-full"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl text-gray-900 font-bold">
              {githubUser?.name}
            </h1>
            <a
              href={`https://github.com/${githubUser?.login}`}
              className="mt-2 text-indigo-600 text-sm font-medium hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              @{githubUser?.login}
            </a>

            {githubUser?.bio ? (
              <p className="mt-5 text-gray-600">{githubUser?.bio}</p>
            ) : (
              <em className="mt-5 text-gray-400 text-sm">User has no bio...</em>
            )}

            <div>
              <div>
                <span className="font-semibold">{githubUser?.followers}</span>
                <span className="text-gray-500">followers</span>
              </div>
              <div>
                <span className="font-semibold">{githubUser?.following}</span>
                <span className="text-gray-500">following</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
