import { useNavigate } from "react-router-dom";
import ExpenseCard from '../cards/ExpenseCard';
import React from 'react';

const Group: React.FC = () => {
  return (
    <div className="min-h-screen pt-24 px-6 content-section">
      <div className="max-w-4xl mx-auto">
        <div className="mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-primary px-2 py-1 bg-primary/10 rounded-full">
            Home
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Group</h1>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={i}
              className="glass p-6 rounded-xl shadow-sm transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">Team {i + 1}</h3>
              <p className="text-muted-foreground mb-4">
                A collaborative workspace for your team members.
              </p>
              <button className="text-primary font-medium hover:underline transition-all duration-200">
                View Team
              </button>
            </div>
          ))}
        </div> */}
        <div>
          <button
            onClick={() => (window.location.href = "/create-group")}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out flex items-center gap-2"
          >
            Create a Group <span className="text-xl">+</span>
          </button>

        </div>

        <ExpenseCard />


        <div className="glass p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start border-b border-gray-100 pb-4 last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-medium">Activity {i + 1}</h4>
                  <p className="text-sm text-muted-foreground">
                    Latest update from your team members.
                  </p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {i + 1}h ago
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Group Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Members', 'Projects', 'Tasks'].map((item, i) => (
              <div key={i} className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">{item}</h4>
                <p className="text-3xl font-bold">{(i + 1) * 12}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
