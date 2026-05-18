export default function MessagesPage() {
  return (
    <div className="page messages-page">
      <div className="messages-sidebar">
        <h2>Messages</h2>
        <div className="conversation-list">
          <p className="empty-state">No conversations yet</p>
        </div>
      </div>
      <div className="messages-main">
        <div className="empty-state-center">
          <span>💬</span>
          <p>Select a conversation to start chatting</p>
        </div>
      </div>
    </div>
  );
}
