import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Download, RefreshCw, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LuxuryTable = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    return a[sortConfig.key].toString().localeCompare(b[sortConfig.key].toString()) * direction;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCw className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Data Explorer</h2>
          
          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search in table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-white/60" />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 flex items-center gap-2"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
            
            <button className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  onClick={() => requestSort('id')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  ID
                  <span className="ml-2 text-gray-400">
                    {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕️'}
                  </span>
                </th>
                <th 
                  onClick={() => requestSort('title')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Title
                  <span className="ml-2 text-gray-400">
                    {sortConfig.key === 'title' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕️'}
                  </span>
                </th>
                <th 
                  onClick={() => requestSort('body')}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Body
                  <span className="ml-2 text-gray-400">
                    {sortConfig.key === 'body' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : '↕️'}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.map((item, index) => (
                <tr 
                  key={item.id}
                  className="group hover:bg-blue-50/50 transition-all duration-200"
                  style={{
                    animation: `fadeIn 0.${index + 1}s ease-out`
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg">
                      #{item.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 group-hover:text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 group-hover:text-gray-700">
                    {item.body.length > 100 ? `${item.body.substring(0, 100)}...` : item.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedData.length)} of {sortedData.length} entries
            </span>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        style={{ width: '100px', height: '100px' }}
        onClick={()=>navigate("/fourth")}
      >
Go to 4th Question
      </button>
    </div>
  );
};

export default LuxuryTable;