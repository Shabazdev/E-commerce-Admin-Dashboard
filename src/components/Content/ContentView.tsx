import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit, Save } from 'lucide-react';
import { BlogPost, PageContent } from '../../types';

interface ContentViewProps {
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  pages: PageContent[];
  setPages: React.Dispatch<React.SetStateAction<PageContent[]>>;
  contentType?: 'homepage' | 'blog' | 'pages';
  addToast: (message: string, type?: 'success' | 'error') => void;
}

export const ContentView: React.FC<ContentViewProps> = ({
  blogPosts,
  setBlogPosts,
  pages,
  setPages,
  contentType = 'homepage',
  addToast
}) => {
  const [activeTab, setActiveTab] = useState<'homepage' | 'blog' | 'pages'>(contentType);
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null);
  const [pageContentText, setPageContentText] = useState('');

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPage) return;
    setPages(pages.map(p => p.id === selectedPage.id ? { ...p, content: pageContentText } : p));
    setSelectedPage(null);
    addToast('Page content updated successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Content Management (CMS)</h1>
          <p className="text-sm text-slate-500">Manage homepage banners, blog articles, and informational store pages</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('homepage')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'homepage' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          Homepage Editor
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'blog' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          Blog Articles ({blogPosts.length})
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${activeTab === 'pages' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
        >
          Information Pages ({pages.length})
        </button>
      </div>

      {selectedPage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in duration-200">
            <h3 className="text-lg font-bold text-slate-900">Edit Page: {selectedPage.title}</h3>
            <form onSubmit={handleSavePage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Page Content</label>
                <textarea
                  rows={6}
                  required
                  value={pageContentText}
                  onChange={(e) => setPageContentText(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedPage(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'homepage' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">Homepage Hero & Section Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Hero Main Title</label>
              <input
                type="text"
                defaultValue="100% Organic & Farm Fresh Products"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-2">Hero Subtitle</label>
              <input
                type="text"
                defaultValue="Get healthy organic groceries delivered directly to your doorstep."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <button
            onClick={() => addToast('Homepage settings saved successfully', 'success')}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" /> Save Homepage Settings
          </button>
        </div>
      )}

      {activeTab === 'blog' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogPosts.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-3">
                    <img src={b.image} alt={b.title} className="w-10 h-10 rounded-lg object-cover border" />
                    <span>{b.title}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">{b.category}</td>
                  <td className="py-3.5 px-4 text-slate-600">{b.author}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{b.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => addToast('Blog post edited successfully', 'success')}
                      className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'pages' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="py-3 px-4">Page Title</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{p.title}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-600">{p.slug}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{p.lastUpdated}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedPage(p);
                        setPageContentText(p.content);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Page
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
