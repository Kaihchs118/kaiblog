import React, { useState } from 'react';

export default function VerifyActions() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [roleClaimed, setRoleClaimed] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    alert('申請資料已送出，管理員將於 24 小時內完成人工審核。');
  };

  const handleClaimRole = () => {
    setRoleClaimed(true);
  };

  return (
    <div>
      {/* 表單部分 */}
      <section style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>Step 3. 填寫入群基本資料</h3>
        <form onSubmit={handleForm}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Discord 使用者名稱 (例如: user#0000):</label>
            <input type="text" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>主要感興趣的領域 (可多選):</label>
            <input type="text" placeholder="例：音樂製作, DaVinci Resolve, 程式開發" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button 
            type="submit" 
            disabled={formSubmitted}
            style={{
              padding: '10px 20px',
              backgroundColor: formSubmitted ? '#6c757d' : '#25c2a0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: formSubmitted ? 'not-allowed' : 'pointer'
            }}
          >
            {formSubmitted ? '資料已提交' : '提交認證申請'}
          </button>
        </form>
      </section>

      {/* 按鈕部分 */}
      <section style={{ textAlign: 'center', padding: '1rem' }}>
        <h3>Step 4. 完成認證並領取身分組</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)' }}>請確認已在 Discord 按下 ✅ 表情後再點擊下方按鈕</p>
        <button 
          onClick={handleClaimRole}
          disabled={roleClaimed}
          style={{
            padding: '12px 30px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'white',
            background: roleClaimed ? '#6c757d' : 'linear-gradient(45deg, #3578e5, #00d2ff)',
            border: 'none',
            borderRadius: '50px',
            cursor: roleClaimed ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: roleClaimed ? 0.7 : 1,
            boxShadow: roleClaimed ? 'none' : '0 4px 15px rgba(53, 120, 229, 0.4)'
          }}
        >
          {roleClaimed ? '認證程序處理中...' : '提交身分組領取申請'}
        </button>
      </section>
    </div>
  );
}
