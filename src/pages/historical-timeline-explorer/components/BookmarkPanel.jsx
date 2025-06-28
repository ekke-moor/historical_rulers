import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookmarkPanel = ({ bookmarks, onBookmarkSelect, onBookmarkDelete, onClose }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-earth rounded-card p-4 w-80 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-heading font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Bookmark" size={18} />
          <span>Bookmarks</span>
        </h4>
        <Button
          variant="ghost"
          iconName="X"
          onClick={onClose}
          className="p-1"
        />
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="BookmarkPlus" size={32} className="text-text-secondary mx-auto mb-2" />
          <p className="text-text-secondary font-body text-sm">
            No bookmarks yet. Click the bookmark button while exploring to save interesting periods.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-background border border-earth-light rounded p-3 hover:shadow-subtle transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h5 className="font-body font-semibold text-text-primary text-sm mb-1">
                    {bookmark.title}
                  </h5>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary mb-2">
                    <Icon name="Calendar" size={12} />
                    <span className="font-data">{bookmark.year} CE</span>
                    <span>•</span>
                    <span>{bookmark.zoomLevel}</span>
                  </div>
                  {bookmark.note && (
                    <p className="text-xs text-text-secondary font-body">
                      {bookmark.note}
                    </p>
                  )}
                  <div className="text-xs text-text-secondary font-body mt-1">
                    Saved {formatDate(bookmark.timestamp)}
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    iconName="Eye"
                    onClick={() => onBookmarkSelect(bookmark)}
                    className="p-1"
                    title="Go to bookmark"
                  />
                  <Button
                    variant="ghost"
                    iconName="Trash2"
                    onClick={() => onBookmarkDelete(bookmark.id)}
                    className="p-1 text-error hover:text-error"
                    title="Delete bookmark"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkPanel;