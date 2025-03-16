
import React from 'react';

const Resources: React.FC = () => {
  const categories = [
    { name: 'Documents', count: 24 },
    { name: 'Images', count: 38 },
    { name: 'Videos', count: 12 },
    { name: 'Presentations', count: 9 },
  ];

  const resources = [
    { name: 'Project Guidelines', category: 'Documents', date: '2 days ago' },
    { name: 'Team Meeting Notes', category: 'Documents', date: '1 week ago' },
    { name: 'Product Showcase', category: 'Presentations', date: '3 days ago' },
    { name: 'Research Findings', category: 'Documents', date: 'Yesterday' },
    { name: 'Marketing Assets', category: 'Images', date: '3 weeks ago' },
    { name: 'Onboarding Video', category: 'Videos', date: '1 month ago' },
  ];

  return (
    <div className="min-h-screen pt-24 px-6 content-section">
      <div className="max-w-4xl mx-auto">
        <div className="mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-full">
            Library
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Resources</h1>
        
        <div className="glass p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold">Browse Resources</h2>
            <div className="relative mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search resources..."
                className="py-2 pl-10 pr-4 rounded-md bg-secondary/50 border-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 w-full md:w-64"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((category, i) => (
              <div
                key={i}
                className="p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors duration-200 cursor-pointer"
              >
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-2xl font-bold mt-2">{category.count}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {resources.map((resource, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center p-4 border border-gray-100 rounded-lg hover:bg-secondary/20 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex-grow">
                  <h4 className="font-medium">{resource.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {resource.category}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:ml-4 text-xs text-muted-foreground">
                  {resource.date}
                </div>
                <button className="mt-3 md:mt-0 md:ml-6 text-primary font-medium hover:underline transition-all duration-200">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Recent Updates</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  {item}
                </div>
                <div>
                  <h4 className="font-medium">New resources added</h4>
                  <p className="text-sm text-muted-foreground">
                    Several new documents have been added to the library.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item} day{item !== 1 ? 's' : ''} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
