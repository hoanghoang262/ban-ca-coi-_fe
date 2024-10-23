import React from 'react';
import { User, Calendar } from 'lucide-react';
import { ContentItem } from '../../shared/state/atom';
import defaultImage from '../../assets/default-blog.webp';

interface ContentListProps {
  data: ContentItem[];
  formatDate: (dateString: string) => string;
  setSelectedItem: (item: ContentItem | null) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  data,
  formatDate,
  setSelectedItem,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <div
          key={item.contentId}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          <img
            src={item.image ? item.image : defaultImage}
            alt={item.title}
            className="w-full h-48 object-cover"
            onError={(e) => (e.currentTarget.src = defaultImage)}
          />
          <div className="p-4 flex flex-col grow">
            <div className="grow">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{item.content}</p>
            </div>
            <div className="">
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                <span>{item.createByName}</span>
                <Calendar className="h-4 w-4 ml-4 mr-1" />
                <span>{formatDate(item.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded transition-colors duration-300 hover:bg-blue-200">
                  {item.contentType}
                </span>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300 px-3 py-1 rounded-md bg-blue-50 hover:bg-blue-100"
                >
                  Read More
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
