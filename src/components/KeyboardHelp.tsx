import React from 'react'
import './KeyboardHelp.css'

interface KeyboardHelpProps {
  isOpen: boolean
  onClose: () => void
}

const KeyboardHelp: React.FC<KeyboardHelpProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="help-modal-overlay" onClick={onClose}>
      <div className="help-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="help-modal-header">
          <h2>Keyboard Shortcuts</h2>
          <button className="help-close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="help-modal-body">
          <section className="help-section">
            <h3>Main Game Controls</h3>
            <div className="shortcut-list">
              <div className="shortcut-item">
                <kbd>Enter</kbd>
                <span>Start the game</span>
              </div>
              <div className="shortcut-item">
                <kbd>PageUp</kbd>
                <span>Increase stake</span>
              </div>
              <div className="shortcut-item">
                <kbd>PageDown</kbd>
                <span>Decrease stake</span>
              </div>
              <div className="shortcut-item">
                <kbd>←</kbd>
                <span>Stop left reel</span>
              </div>
              <div className="shortcut-item">
                <kbd>↓</kbd>
                <span>Stop middle reel</span>
              </div>
              <div className="shortcut-item">
                <kbd>→</kbd>
                <span>Stop right reel</span>
              </div>
              <div className="shortcut-item">
                <kbd>Space</kbd>
                <span>Change button</span>
              </div>
              <div className="shortcut-item">
                <kbd>+</kbd>
                <span>Buy button</span>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h3>Bonus Game Controls</h3>
            <div className="shortcut-list">
              <div className="shortcut-item">
                <kbd>↑</kbd>
                <span>Bet HIGHER</span>
              </div>
              <div className="shortcut-item">
                <kbd>↓</kbd>
                <span>Bet LOWER</span>
              </div>
              <div className="shortcut-item">
                <kbd>Enter</kbd>
                <span>Withdraw winnings</span>
              </div>
            </div>
          </section>

          <section className="help-section">
            <h3>General</h3>
            <div className="shortcut-list">
              <div className="shortcut-item">
                <kbd>?</kbd>
                <span>Open this help menu</span>
              </div>
              <div className="shortcut-item">
                <kbd>Esc</kbd>
                <span>Close this help menu</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default KeyboardHelp
