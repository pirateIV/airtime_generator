import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GitForkIcon, Loader2, Star } from "lucide-react";

import {
  getFollowers,
  getFollowing,
  getRepositories,
  getUser,
} from "./services/ghService";
import People from "./components/People";

const TabButton = ({ id, count, active, onSwitchTo, controls, children }) => {
  const [searchParams] = useSearchParams("user");

  const user = searchParams.get("user");

  return (
    <Link
      id={id}
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      to={user ? `?tab=${onSwitchTo}&user=${user}` : `?tab=${onSwitchTo}`}
      className={`flex-1 px-4 py-2 font-medium text-sm text-center rounded-lg bg-gradient-to-b ${
        active
          ? "from-indigo-400 to-indigo-600 text-white"
          : "text-gray-600 hover:text-indigo-500"
      }`}
    >
      {children}
      <span
        className={`ml-1 text-xs ${
          active ? "text-indigo-100" : "text-gray-500"
        }`}
      >
        ({count})
      </span>
    </Link>
  );
};

const RepositoryCard = ({ repo }) => {
  return (
    <div className="border border-slate-300 py-3.5 px-5 rounded-xl">
      <a
        title={repo.name}
        className="font-medium text-indigo-600 hover:underline line-clamp-1"
        href={repo.svn_url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {repo.name}
      </a>
      <div className="mt-1 text-xs  text-gray-500 min-h-8 line-clamp-2 text-balance">
        {repo?.description}
      </div>
      <div className="flex items-center mt-2 gap-x-3 lg:gap-x-5">
        {repo.language && (
          <div className="flex items-center text-gray-700 text-sm">
            <div
              className="size-2 mr-2 rounded-full bg-indigo-500"
              aria-hidden="true"
            ></div>
            <span className="text-nowrap">{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-x-2 flex-1 lg:gap-x-3">
          {Number(repo.stargazers_count) > 0 && (
            <div className="flex items-center gap-x-1.5 text-sm">
              <Star className="text-gray-400 size-4" aria-hidden="true" />
              <span className="text-gray-700">{repo.stargazers_count}</span>
            </div>
          )}
          {Number(repo.forks_count) > 0 && (
            <div className="flex items-center gap-x-1.5 text-sm">
              <GitForkIcon
                className="text-gray-400 size-4"
                aria-hidden="true"
              />
              <span className="text-gray-700">{repo.forks_count}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  return (
    <div key={user.id} className="border border-slate-300 p-3 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-x-4">
          <img
            src={user.avatar_url}
            className="size-10 rounded-full border-2 border-slate-300"
            alt="user avatar"
          />
          <Link
            to={`?tab=${tab}&user=${user.login}`}
            className="text-indigo-600 font-medium hover:underline"
          >
            {user.login}
          </Link>
        </div>
        <div>
          <a href={user.html_url} rel="noopener noferrer" target="_blank">
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [searchParams] = useSearchParams();

  const [username, setUsername] = useState("pirateIV");
  const [githubUser, setGithubUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  const [currentTab, setCurrentTab] = useState("repositories");

  useEffect(() => {
    setUsername(searchParams.get("user"));
    setCurrentTab(searchParams.get("tab") || "repositories");
  }, [searchParams]);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        const [user, repos, followersList, followingList] = await Promise.all([
          getUser(username),
          getRepositories(username),
          getFollowers(username),
          getFollowing(username),
        ]);

        setGithubUser(user);
        setRepositories(repos);
        setFollowers(followersList);
        setFollowing(followingList);
      } catch (e) {
        setError({ error: true, message: e.message });
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [username]);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <Loader2 className="size-7 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error.error) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-red-500 text-lg font-semibold">Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-4xl text-gray-900 font-semibold">
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

            <div className="flex items-center mt-3 gap-x-2">
              <div className="flex items-center gap-1">
                <People />
                <span className="font-semibold text-gray-900">
                  {githubUser?.followers}
                </span>
                <button
                  className="text-gray-600 hover:text-indigo-500"
                  onClick={() => setCurrentTab("followers")}
                >
                  <span>followers</span>
                </button>
              </div>
              <span className="text-slate-600">&middot;</span>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-gray-900">
                  {githubUser?.following}
                </span>
                <button
                  className="text-gray-600 hover:text-indigo-500"
                  onClick={() => setCurrentTab("following")}
                >
                  <span>following</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-10">
          <TabList
            currentTab={currentTab}
            tabs={[
              { id: "repositories", count: githubUser.public_repos },
              { id: "followers", count: githubUser.followers },
              { id: "following", count: githubUser.following },
            ]}
          />

          {/* Tab Content */}
          <div className="mt-8">
            {currentTab === "repositories" && (
              <div className="grid grid-cols-3 gap-5" role="tabpanel">
                {repositories?.map((repo) => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            {currentTab === "followers" && (
              <div className="grid grid-cols-3 gap-5" role="tabpanel">
                {followers?.map((follower) => (
                  <UserCard key={follower.id} user={follower} />
                ))}
              </div>
            )}

            {currentTab === "following" && (
              <div className="grid grid-cols-3 gap-5" role="tabpanel">
                {following?.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const TabList = ({ tabs, currentTab }) => {
  return (
    <div
      role="tablist"
      className="flex max-w-md mx-auto p-1 space-x-2 bg-white rounded-xl shadow-sm shadow-black/20"
    >
      {tabs.map((tab, index) => (
        <TabButton
          id={`tab-btn-${index}`}
          count={tab.count}
          controls={`panel-${index}`}
          active={currentTab === tab.id}
          onSwitchTo={tab.id}
        >
          <span className="capitalize">{tab.id}</span>
        </TabButton>
      ))}
    </div>
  );
};

export default App;
