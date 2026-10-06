import React from 'react';
import { Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { Review } from '../../types';

interface ReviewsViewProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({ reviews, setReviews, addToast }) => {
  const handleUpdateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
    addToast(`Review status updated to ${status}`, 'success');
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
    addToast('Review deleted successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Reviews</h1>
        <p className="text-sm text-slate-500">Moderate and approve product reviews and ratings</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Review</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={rev.customerAvatar} alt={rev.customerName} className="w-9 h-9 rounded-full object-cover border" />
                  <span className="font-semibold text-slate-900">{rev.customerName}</span>
                </td>
                <td className="py-3 px-4 text-slate-700 font-medium">{rev.productName}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 max-w-xs text-slate-600 truncate">{rev.reviewText}</td>
                <td className="py-3 px-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    rev.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                    rev.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {rev.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {rev.status !== 'Approved' && (
                      <button
                        onClick={() => handleUpdateStatus(rev.id, 'Approved')}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Approve Review"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    {rev.status !== 'Rejected' && (
                      <button
                        onClick={() => handleUpdateStatus(rev.id, 'Rejected')}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Reject Review"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
