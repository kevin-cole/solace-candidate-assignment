import React from 'react';
import { Advocate } from '../types';

interface AdvocateListProps {
  advocates: Advocate[]
}

const AdvocateTable: React.FC<AdvocateListProps> = ({ advocates }) => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-green-900 mb-6">Advocates List</h2>
      <table className="bg-white shadow-md rounded-lg overflow-visible">
        <thead className="bg-green-900 bg-opacity-80 text-white">
          <tr>
            <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">First Name</th>
            <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Last Name</th>
            <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">City</th>
            <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Specialties</th>
            <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">Experience</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 overflow-visible">
          {advocates.map((advocate) => (
            <tr key={advocate.id} className="bg-gray-100 border-b hover:bg-green-50">
              <td className="py-3 px-4">{advocate.firstName}</td>
              <td className="py-3 px-4">{advocate.lastName}</td>
              <td className="py-3 px-4">{advocate.city}</td>
              <td className="py-3 px-4 whitespace-nowrap text-ellipsis relative group">
                {advocate.specialties.length > 0 && (
                  <div>
                    {advocate.specialties[0]} {advocate.specialties.length > 1 && '...'}
                  </div>
                )}

                {/* Hover to show full content */}
                {advocate.specialties.length > 1 && (
                  <span className="absolute left-0 bg-white text-gray-900 p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 whitespace-normal">
                    {/* Display each item in a new line */}
                    {advocate.specialties.map((specialty, index) => (
                      <div key={index}>{specialty}</div>
                    ))}
                  </span>
                )}
              </td>
              <td className="py-3 px-4">{advocate.yearsOfExperience} years</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvocateTable;
