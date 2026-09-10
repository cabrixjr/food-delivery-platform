import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { ShieldCheck, Check, X, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVerifications = async () => {
    try {
      const response = await API.get('/admin/verifications');
      setVerifications(response.data.pending_verifications);
    } catch (err) {
      console.error('Error fetching verification requests', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const handleVerify = async (hotelId, docId, status) => {
    try {
      await API.post('/admin/verify-hotel', {
        hotel_id: hotelId,
        document_id: docId,
        status,
      });
      fetchVerifications();
    } catch (err) {
      alert('Action failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center space-x-3 mb-6">
        <ShieldCheck className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Document Verification</h1>
      </div>
      <p className="text-gray-500 mb-8">Validate submitted hotel registration documents to keep the platform reliable[cite: 1].</p>

      {loading ? (
        <p className="text-gray-500">Loading pending requests...</p>
      ) : verifications.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500">No pending hotel business document verifications[cite: 1].</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                <th className="py-3 px-4">Hotel Business Name</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {verifications.map((req) => (
                <tr key={req.document_id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 font-bold text-gray-800">{req.business_name}</td>
                  <td className="py-4 px-4 text-gray-600">
                    <div>{req.contact_phone}</div>
                    <div className="text-xs text-gray-400">{req.contact_email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <a
                      href={req.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:underline font-medium"
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      {req.document_name}
                    </a>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => handleVerify(req.hotel_id, req.document_id, 'APPROVED')}
                      className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-semibold"
                    >
                      <Check className="w-3.5 h-3.5 mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => handleVerify(req.hotel_id, req.document_id, 'REJECTED')}
                      className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-semibold"
                    >
                      <X className="w-3.5 h-3.5 mr-1" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;