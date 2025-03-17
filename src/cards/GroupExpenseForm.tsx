import React, { useState, useEffect } from 'react';

const GroupExpenseManager = () => {
  // State for Group Creation Form
  const [groupName, setGroupName] = useState('');
  const [canteenPlace, setCanteenPlace] = useState('');
  const [payers, setPayers] = useState(['']);
  const [date, setDate] = useState('');
  const [groupCreated, setGroupCreated] = useState(false);

  // State for Expense Entry
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseIndex, setEditingExpenseIndex] = useState(null);

  // State for Individual Member Expenses
  const [memberName, setMemberName] = useState('');
  const [memberItemName, setMemberItemName] = useState('');
  const [memberQuantity, setMemberQuantity] = useState('');
  const [memberPricePerUnit, setMemberPricePerUnit] = useState('');
  const [memberTotal, setMemberTotal] = useState('');
  const [memberExpenses, setMemberExpenses] = useState([]);
  const [editingMemberExpenseIndex, setEditingMemberExpenseIndex] = useState(null);
  
  // State for validation messages
  const [validationMessage, setValidationMessage] = useState('');

  // Check if quantity limits are exceeded when member expenses change
  useEffect(() => {
    if (validationMessage) {
      const timer = setTimeout(() => {
        setValidationMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [validationMessage]);

  // Add a new payer field
  const addPayer = () => {
    setPayers([...payers, '']);
  };

  // Update payer at specific index
  const updatePayer = (index, value) => {
    const newPayers = [...payers];
    newPayers[index] = value;
    setPayers(newPayers);
  };

  // Create group
  const createGroup = (e) => {
    e.preventDefault();
    if (groupName && canteenPlace && date && payers.filter(p => p).length > 0) {
      setGroupCreated(true);
    } else {
      alert('Please fill all required fields');
    }
  };

  // Calculate used quantity for an item
  const getUsedQuantity = (itemName, excludeIndex = -1) => {
    return memberExpenses.reduce((sum, expense, index) => {
      if (expense.item === itemName && index !== excludeIndex) {
        return sum + expense.quantity;
      }
      return sum;
    }, 0);
  };

  // Get available quantity for an item
  const getAvailableQuantity = (itemName, excludeIndex = -1) => {
    const itemExpense = expenses.find(expense => expense.item === itemName);
    if (!itemExpense) return 0;
    
    const totalQuantity = itemExpense.quantity;
    const usedQuantity = getUsedQuantity(itemName, excludeIndex);
    
    return totalQuantity - usedQuantity;
  };

  // Add expense to the table
  const addExpense = () => {
    if (itemName && quantity && pricePerUnit) {
      const newExpense = {
        item: itemName,
        quantity: parseFloat(quantity),
        pricePerUnit: parseFloat(pricePerUnit),
        total: parseFloat(quantity) * parseFloat(pricePerUnit)
      };
      
      if (editingExpenseIndex !== null) {
        // Check if reducing quantity would violate allocations
        const oldExpense = expenses[editingExpenseIndex];
        if (oldExpense.item === newExpense.item && newExpense.quantity < oldExpense.quantity) {
          const usedQuantity = getUsedQuantity(oldExpense.item);
          if (usedQuantity > newExpense.quantity) {
            setValidationMessage(`Cannot reduce quantity below ${usedQuantity} as it's already assigned to members`);
            return;
          }
        }
        
        // Update existing expense
        const updatedExpenses = [...expenses];
        updatedExpenses[editingExpenseIndex] = newExpense;
        setExpenses(updatedExpenses);
        setEditingExpenseIndex(null);
      } else {
        // Check if item already exists
        const existingItemIndex = expenses.findIndex(e => e.item === itemName);
        if (existingItemIndex >= 0) {
          setValidationMessage('An item with this name already exists. Please edit the existing item instead.');
          return;
        }
        
        // Add new expense
        setExpenses([...expenses, newExpense]);
      }
      
      // Clear inputs
      setItemName('');
      setQuantity('');
      setPricePerUnit('');
    } else {
      alert('Please fill all expense fields');
    }
  };

  // Start editing an expense
  const editExpense = (index) => {
    const expense = expenses[index];
    setItemName(expense.item);
    setQuantity(expense.quantity.toString());
    setPricePerUnit(expense.pricePerUnit.toString());
    setEditingExpenseIndex(index);
  };

  // Delete an expense
  const deleteExpense = (index) => {
    const expenseToDelete = expenses[index];
    const isItemAssigned = memberExpenses.some(me => me.item === expenseToDelete.item);
    
    if (isItemAssigned) {
      setValidationMessage(`Cannot delete "${expenseToDelete.item}" as it's assigned to members. Remove member assignments first.`);
      return;
    }
    
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  // Cancel expense editing
  const cancelExpense = () => {
    setItemName('');
    setQuantity('');
    setPricePerUnit('');
    setEditingExpenseIndex(null);
  };

  // Calculate total expenses
  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.total, 0);
  };

  // Add member expense to the table
  const addMemberExpense = () => {
    if (memberName && memberItemName && memberQuantity && memberPricePerUnit) {
      const parsedQuantity = parseFloat(memberQuantity);
      const total = parsedQuantity * parseFloat(memberPricePerUnit);
      
      // Check available quantity
      let availableQuantity = 0;
      
      if (editingMemberExpenseIndex !== null) {
        availableQuantity = getAvailableQuantity(memberItemName, editingMemberExpenseIndex);
      } else {
        availableQuantity = getAvailableQuantity(memberItemName);
      }
      
      if (parsedQuantity > availableQuantity) {
        setValidationMessage(`Cannot assign ${parsedQuantity} of "${memberItemName}". Only ${availableQuantity} available.`);
        return;
      }
      
      const newMemberExpense = {
        member: memberName,
        item: memberItemName,
        quantity: parsedQuantity,
        pricePerUnit: parseFloat(memberPricePerUnit),
        total
      };
      
      if (editingMemberExpenseIndex !== null) {
        // Update existing member expense
        const updatedMemberExpenses = [...memberExpenses];
        updatedMemberExpenses[editingMemberExpenseIndex] = newMemberExpense;
        setMemberExpenses(updatedMemberExpenses);
        setEditingMemberExpenseIndex(null);
      } else {
        // Add new member expense
        setMemberExpenses([...memberExpenses, newMemberExpense]);
      }
      
      // Clear inputs
      setMemberName('');
      setMemberItemName('');
      setMemberQuantity('');
      setMemberPricePerUnit('');
      setMemberTotal('');
    } else {
      alert('Please fill all member expense fields');
    }
  };

  // Start editing a member expense
  const editMemberExpense = (index) => {
    const expense = memberExpenses[index];
    setMemberName(expense.member);
    setMemberItemName(expense.item);
    setMemberQuantity(expense.quantity.toString());
    setMemberPricePerUnit(expense.pricePerUnit.toString());
    setMemberTotal((expense.quantity * expense.pricePerUnit).toFixed(2));
    setEditingMemberExpenseIndex(index);
  };

  // Delete a member expense
  const deleteMemberExpense = (index) => {
    const updatedMemberExpenses = memberExpenses.filter((_, i) => i !== index);
    setMemberExpenses(updatedMemberExpenses);
  };

  // Cancel member expense editing
  const cancelMemberExpense = () => {
    setMemberName('');
    setMemberItemName('');
    setMemberQuantity('');
    setMemberPricePerUnit('');
    setMemberTotal('');
    setEditingMemberExpenseIndex(null);
  };

  // Update member total when quantity or price changes
  const updateMemberTotal = (qty, price) => {
    if (qty && price) {
      setMemberTotal((parseFloat(qty) * parseFloat(price)).toFixed(2));
    } else {
      setMemberTotal('');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Group Expense Manager</h1>
      
      {/* Step 1: Group Creation Form */}
      {!groupCreated ? (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Step 1: Group Creation</h2>
          <form onSubmit={createGroup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Group Name</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Canteen Place</label>
                <input
                  type="text"
                  value={canteenPlace}
                  onChange={(e) => setCanteenPlace(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Paid By</label>
              <div className="space-y-2">
                {payers.map((payer, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={payer}
                      onChange={(e) => updatePayer(index, e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Enter payer name"
                      required
                    />
                    {index === payers.length - 1 && (
                      <button
                        type="button"
                        onClick={addPayer}
                        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                      >
                        Add
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create
            </button>
          </form>
        </div>
      ) : (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Group Details</h2>
          <p className="text-lg">
            <strong>Group Name:</strong> {groupName} | 
            <strong> Place:</strong> {canteenPlace} | 
            <strong> Paid By:</strong> {payers.filter(p => p).join(', ')} | 
            <strong> Date:</strong> {new Date(date).toLocaleDateString()}
          </p>
        </div>
      )}
      
      {/* Validation Message */}
      {validationMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative">
          <span className="block sm:inline">{validationMessage}</span>
          <button 
            className="absolute top-0 right-0 px-4 py-3" 
            onClick={() => setValidationMessage('')}
          >
            <span className="text-red-500">×</span>
          </button>
        </div>
      )}
      
      {/* Step 2: Expense Entry Table */}
      {groupCreated && (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            {editingExpenseIndex !== null ? 'Edit Expense' : 'Step 2: Expense Entry'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 border rounded"
                readOnly={editingExpenseIndex !== null}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per unit</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={addExpense}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                {editingExpenseIndex !== null ? 'Update' : 'Add'}
              </button>
              <button
                onClick={cancelExpense}
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Item</th>
                  <th className="px-4 py-2 border text-left">Quantity</th>
                  <th className="px-4 py-2 border text-left">Price per unit</th>
                  <th className="px-4 py-2 border text-left">Total</th>
                  <th className="px-4 py-2 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{expense.item}</td>
                    <td className="px-4 py-2 border">{expense.quantity}</td>
                    <td className="px-4 py-2 border">${expense.pricePerUnit.toFixed(2)}</td>
                    <td className="px-4 py-2 border">${expense.total.toFixed(2)}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editExpense(index)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExpense(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {expenses.length > 0 && (
                  <tr className="bg-gray-200 font-bold">
                    <td colSpan={3} className="px-4 py-2 border text-right">Total</td>
                    <td className="px-4 py-2 border">${calculateTotal().toFixed(2)}</td>
                    <td className="px-4 py-2 border"></td>
                  </tr>
                )}
                {expenses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-2 border text-center">No expenses added yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Step 3: Individual Member Expenses */}
      {groupCreated && expenses.length > 0 && (
        <div className="p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            {editingMemberExpenseIndex !== null ? 'Edit Member Expense' : 'Step 3: Individual Member Expenses'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Member Name</label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <select
                value={memberItemName}
                onChange={(e) => {
                  setMemberItemName(e.target.value);
                  const selectedExpense = expenses.find(exp => exp.item === e.target.value);
                  if (selectedExpense) {
                    setMemberPricePerUnit(selectedExpense.pricePerUnit);
                    updateMemberTotal(memberQuantity, selectedExpense.pricePerUnit);
                  }
                }}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Item</option>
                {expenses.map((expense, index) => {
                  const availableQty = getAvailableQuantity(
                    expense.item, 
                    editingMemberExpenseIndex
                  );
                  return (
                    <option 
                      key={index} 
                      value={expense.item}
                      disabled={availableQty <= 0 && expense.item !== memberItemName}
                    >
                      {expense.item} (Available: {availableQty})
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={memberQuantity}
                onChange={(e) => {
                  setMemberQuantity(e.target.value);
                  updateMemberTotal(e.target.value, memberPricePerUnit);
                }}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price per unit</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={memberPricePerUnit}
                onChange={(e) => {
                  setMemberPricePerUnit(e.target.value);
                  updateMemberTotal(memberQuantity, e.target.value);
                }}
                className="w-full p-2 border rounded"
                readOnly
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={addMemberExpense}
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
              >
                {editingMemberExpenseIndex !== null ? 'Update' : 'Add'}
              </button>
              <button
                onClick={cancelMemberExpense}
                className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Member</th>
                  <th className="px-4 py-2 border text-left">Item</th>
                  <th className="px-4 py-2 border text-left">Quantity</th>
                  <th className="px-4 py-2 border text-left">Price per unit</th>
                  <th className="px-4 py-2 border text-left">Total</th>
                  <th className="px-4 py-2 border text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {memberExpenses.map((expense, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{expense.member}</td>
                    <td className="px-4 py-2 border">{expense.item}</td>
                    <td className="px-4 py-2 border">{expense.quantity}</td>
                    <td className="px-4 py-2 border">${expense.pricePerUnit.toFixed(2)}</td>
                    <td className="px-4 py-2 border">${expense.total.toFixed(2)}</td>
                    <td className="px-4 py-2 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editMemberExpense(index)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMemberExpense(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {memberExpenses.length > 0 && (
                  <tr className="bg-gray-200 font-bold">
                    <td colSpan={4} className="px-4 py-2 border text-right">Total</td>
                    <td className="px-4 py-2 border">
                      ${memberExpenses.reduce((sum, exp) => sum + exp.total, 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border"></td>
                  </tr>
                )}
                {memberExpenses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-2 border text-center">No member expenses added yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupExpenseManager;