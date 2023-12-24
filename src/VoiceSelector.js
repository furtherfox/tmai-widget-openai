import React from 'react';
import styles from './Widget.module.css';

const voices = [
  { id: 'nova', name: 'Nova' },
  { id: 'echo', name: 'Echo' },
  { id: 'fable', name: 'Fable' },
  { id: 'onyx', name: 'Onyx' },
  { id: 'shimmer', name: 'Shimmer' },
  { id: 'alloy', name: 'Alloy' },
  // Add more voices as needed
];

const VoiceSelector = React.forwardRef(({ voiceId, setVoiceId, isVisible }, ref) => (
  <select
    ref={ref}
    className={`${styles['myWidget-voice-selector']} ${isVisible ? styles.visible : ''}`}
    value={voiceId}
    onChange={(e) => setVoiceId(e.target.value)}
  >
    <option value="" disabled>Choose a Voice</option> {/* Removed the selected attribute */}
    {voices.map(voice => (
      <option key={voice.id} value={voice.id}>{voice.name}</option>
    ))}
  </select>
));

export default VoiceSelector;
