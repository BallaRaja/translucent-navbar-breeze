const ExpenseCard = () => {
  // These values would normally come from props or state
  // You can modify these values directly in this component
  const totalAmount = 1200;
  const settledAmount = 1000;
  const unsettledAmount = totalAmount - settledAmount;
  
  // Calculate the percentage for the progress bar
  const settledPercentage = (settledAmount / totalAmount) * 100;
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-gray-300">
      {/* Header with Badge */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Group 1</h2>
          <p className="text-gray-600">Night Canteen</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
          Sunday
        </div>
      </div>
      
      {/* Date information */}
      <div className="flex items-center mb-5 text-sm text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>16 March 2025</span>
      </div>
      
      {/* Amount section with visual indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="text-gray-900 font-bold">₹{totalAmount}</span>
        </div>
        
        {/* Dynamic progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
          <div 
            className="bg-green-500 h-2.5 rounded-full" 
            style={{width: `${settledPercentage}%`}}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-600 font-medium">Settled: ₹{settledAmount}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-red-500 font-medium">Unsettled: ₹{unsettledAmount}</span>
          </div>
        </div>
      </div>
      
      {/* Paid by section */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center bg-gray-100 w-8 h-8 rounded-full mr-2">
          <span className="text-gray-600 text-xs font-bold">YR</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Paid By</p>
          <p className="text-gray-700 font-medium">You, Rahul</p>
        </div>
      </div>
      
      {/* Action button */}
      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
        View Team
      </button>
    </div>
  );
};

export default ExpenseCard;