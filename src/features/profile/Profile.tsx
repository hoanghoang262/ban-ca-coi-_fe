import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { FaUserCircle } from 'react-icons/fa';
import defaultCover from '../../assets/default-cover.jpg';
import axios from 'axios';
import { userInfoState } from '../../shared/state/atom';

export default function UserProfile() {
  const userInfoFromState = useRecoilValue(userInfoState);
  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    bio: 'Passionate about technology and innovation. Always learning, always growing.',
    location: '',
    email: '',
    phone: '',
    occupation: '',
    joinDate: '',
  });

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userInfoFromState) return;

      try {
        const response = await axios.get(
          `http://157.66.27.65:8080/api/Account/profile/${userInfoFromState.id}`,
          {
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = response.data.data;
        setUserInfo({
          name: data.name,
          username: '@' + data.name.toLowerCase().replace(/\s+/g, ''),
          bio: 'Passionate about technology and innovation. Always learning, always growing.',
          location: data.address,
          email: data.email,
          phone: data.phone,
          occupation: data.roleName || 'Unknown',
          joinDate: new Date(data.createdAt).toLocaleDateString(),
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [userInfoFromState]);

  const handleEdit = async () => {
    if (isEditing && userInfoFromState) {
      try {
        await axios.post(
          `http://157.66.27.65:8080/api/Account/update-profile/${userInfoFromState.id}`,
          {
            name: userInfo.name,
            phone: userInfo.phone,
            address: userInfo.location,
          },
          {
            headers: {
              accept: '*/*',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } catch (error) {
        console.error('Error updating user info:', error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-[calc(100vh-96px)] bg-gradient-to-br from-gray-50 to-gray-100 w-full h-full mx-auto shadow-xl overflow-hidden flex flex-col px-4 border-blue-300 border-x-[1px]">
      <div className="relative h-48 md:h-64">
        <img
          src={defaultCover}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        <button className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
      <div className="relative px-4 pb-4 flex-grow">
        <div className="absolute -top-16 left-4">
          <FaUserCircle className="w-32 h-32 text-gray-400" />
        </div>
        <div className="pt-20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {userInfo.name}
              </h1>
              <p className="text-gray-600">{userInfo.username}</p>
            </div>
            <button
              onClick={handleEdit}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
          <div className="mb-4">
            <div className="flex space-x-4 mb-4">
              {['about', 'posts', 'photos'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'text-gray-600 font-semibold border-b-2 border-gray-600'
                      : 'text-gray-600 hover:text-gray-600'
                  } pb-2 transition duration-300`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            {activeTab === 'about' && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={userInfo.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded mb-4"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700 mb-4">{userInfo.bio}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
                      label: 'location',
                    },
                    {
                      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                      label: 'email',
                    },
                    {
                      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
                      label: 'phone',
                    },
                    {
                      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                      label: 'occupation',
                    },
                    {
                      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
                      label: 'joinDate',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center space-x-2 text-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                      {isEditing && item.label !== 'joinDate' ? (
                        <input
                          type="text"
                          name={item.label}
                          value={userInfo[item.label as keyof typeof userInfo]}
                          onChange={handleInputChange}
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        <span>
                          {userInfo[item.label as keyof typeof userInfo]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'posts' && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Posts</h2>
                <p className="text-gray-600">No posts to display yet.</p>
              </div>
            )}
            {activeTab === 'photos' && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                <p className="text-gray-600">No photos to display yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
