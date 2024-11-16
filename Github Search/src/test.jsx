import React from "react"
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const BASE_URL = "https://api.github.com/users";

// Service functions
const getUser = async (user) => {
  const res = await fetch(`${BASE_URL}/${user}`);
  return await res.json();
};

const getRepositories = async (user) => {
  const res = await fetch(`${BASE_URL}/${user}/repos`);
  return await res.json();
};

const getFollowers = async (user) => {
  const res = await fetch(`${BASE_URL}/${user}/followers`);
  return await res.json();
};

const getFollowing = async (user) => {
  const res = await fetch(`${BASE_URL}/${user}/following`);
  return await res.json();
};

// Components
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
      active
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
    }`}
  >
    {children}
  </button>
);

const RepositoryCard = ({ repo }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-indigo-600 hover:underline"
      >
        {repo.name}
      </a>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <span className="text-sm text-gray-600">{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span className="text-sm text-gray-600">{repo.forks_count}</span>
        </div>
      </div>
    </div>
    {repo.description && (
      <p className="mt-2 text-gray-600 text-sm">{repo.description}</p>
    )}
    <div className="mt-4 flex items-center space-x-4">
      {repo.language && (
        <div className="flex items-center space-x-1">
          <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
          <span className="text-sm text-gray-600">{repo.language}</span>
        </div>
      )}
      <span className="text-sm text-gray-500">
        Updated {new Date(repo.updated_at).toLocaleDateString()}
      </span>
    </div>
  </div>
);

const UserCard = ({ user }) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
    <img
      src={user.avatar_url}
      alt={`${user.login}'s avatar`}
      className="w-12 h-12 rounded-full"
    />
    <div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-indigo-600 hover:underline"
      >
        {user.login}
      </a>
    </div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [githubUser, setGithubUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [activeTab, setActiveTab] = useState("repositories");

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const [user, repos, followersList, followingList] = await Promise.all([
          getUser("stemitom"),
          getRepositories("stemitom"),
          getFollowers("stemitom"),
          getFollowing("stemitom")
        ]);

        setGithubUser(user);
        setRepositories(repos);
        setFollowers(followersList);
        setFollowing(followingList);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Profile Header */}
        <section className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            <img
              src={githubUser?.avatar_url || "https://github.githubassets.com/images/gravatars/gravatar-user-420.png"}
              alt="github user avatar"
              className="w-48 h-48 rounded-full ring-4 ring-gray-100"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900">{githubUser?.name}</h1>
            <a
              href={`https://github.com/${githubUser?.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-indigo-600 hover:underline mt-2"
            >
              @{githubUser?.login}
            </a>
            
            {githubUser?.bio && (
              <p className="mt-4 text-gray-600">{githubUser.bio}</p>
            )}
            
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className="font-semibold text-gray-900">{githubUser?.followers}</span>
                <span className="text-gray-600">followers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{githubUser?.following}</span>
                <span className="text-gray-600">following</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-10">
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg max-w-md mx-auto">
            <TabButton
              active={activeTab === "repositories"}
              onClick={() => setActiveTab("repositories")}
            >
              Repositories ({repositories.length})
            </TabButton>
            <TabButton
              active={activeTab === "followers"}
              onClick={() => setActiveTab("followers")}
            >
              Followers ({followers.length})
            </TabButton>
            <TabButton
              active={activeTab === "following"}
              onClick={() => setActiveTab("following")}
            >
              Following ({following.length})
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "repositories" && (
              <div className="grid gap-4 md:grid-cols-2">
                {repositories.map(repo => (
                  <RepositoryCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}
            
            {activeTab === "followers" && (
              <div className="grid gap-4 md:grid-cols-2">
                {followers.map(follower => (
                  <UserCard key={follower.id} user={follower} />
                ))}
              </div>
            )}
            
            {activeTab === "following" && (
              <div className="grid gap-4 md:grid-cols-2">
                {following.map(user => (
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

export default App;