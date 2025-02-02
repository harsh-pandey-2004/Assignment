import React, { useState, useEffect } from 'react';

const MindMap = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleUsers, setVisibleUsers] = useState(3); // Initially show posts for 3 users

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Group posts by userId
  const groupedPosts = posts.reduce((acc, post) => {
    if (!acc[post.userId]) {
      acc[post.userId] = [];
    }
    acc[post.userId].push(post);
    return acc;
  }, {});

  // Get the first `visibleUsers` users
  const visibleGroupedPosts = Object.entries(groupedPosts).slice(0, visibleUsers);

  // Function to load more users
  const loadMoreUsers = () => {
    setVisibleUsers((prev) => prev + 3); // Increase visible users by 3
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-8 shadow-lg transform transition-transform duration-500 hover:scale-105">
            <h1 className="text-3xl font-bold">Posts Mindmap</h1>
            <p className="text-sm mt-2">Explore posts grouped by users</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {visibleGroupedPosts.map(([userId, userPosts]) => (
              <div
                key={userId}
                className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
                  <h2 className="text-xl font-semibold text-white">User {userId}</h2>
                </div>
                <div className="p-4 space-y-4">
                  {userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-200 border-l-4 border-blue-400"
                    >
                      <h3 className="text-md font-medium text-gray-800 mb-2">{post.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">{post.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {visibleUsers < Object.keys(groupedPosts).length && (
            <button
              onClick={loadMoreUsers}
              className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Load +3
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MindMap;