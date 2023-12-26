  import React, { useState, useEffect, useRef } from 'react';
  import ActionButton from './ActionButton';
  import LanguageButton from './LanguageButton';
  import AudioPlayer from './AudioPlayer';
  import LanguageSelector from './LanguageSelector';
  import VoiceSelector from './VoiceSelector';
  import readData from './readData'; // Adjust the path based on your file structure
  import styles from './Widget.module.css';

  const Widget = () => {
    const [voiceId, setVoiceId] = useState('nova'); 
    const [language, setLanguage] = useState('English');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);
    const widgetRef = useRef(null);

    const [showLanguageSelector, setShowLanguageSelector] = useState(false);

    useEffect(() => {
      // Load user preferences from local storage
      const savedLanguage = localStorage.getItem('userLanguage');
      const savedVoiceId = localStorage.getItem('userVoiceId');
  
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
  
      if (savedVoiceId) {
        setVoiceId(savedVoiceId);
      }
    }, []);
  
    useEffect(() => {
      // Save user preferences to local storage when they change
      localStorage.setItem('userLanguage', language);
      localStorage.setItem('userVoiceId', voiceId);
    }, [language, voiceId]);
    
    const handlePlayClick = async () => {
      setIsLoading(true);
      const contentToSend = document.documentElement.innerText;
    
      try {
        const response = await fetch('https://tmai-server-openai-b5ecbf724194.herokuapp.com/generate_audio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: contentToSend, language, voiceId })
        });
    
        if (response.ok) {
          const mediaSource = new MediaSource();
          audioRef.current.src = URL.createObjectURL(mediaSource);
    
          mediaSource.addEventListener('sourceopen', () => {
            const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg'); // Specify MIME type
            const reader = response.body.getReader();
            readData(sourceBuffer, mediaSource, reader, () => {});
          });
    
          await audioRef.current.play();
          setIsPlaying(true);
          setIsLoading(false);
        } else {
          throw new Error('Failed to fetch audio');
        }
      } catch (error) {
        console.error('Error fetching audio:', error);
        setIsLoading(false);
      }
    };
    

    const handleStopClick = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.src = '';
      }
      setIsPlaying(false);
    };

    const handleActionClick = () => {
      if (isLoading) return;
      isPlaying ? handleStopClick() : handlePlayClick();
    };

    useEffect(() => {
      // Handling audio end event
      const audioElement = audioRef.current;
      const handleAudioEnd = () => setIsPlaying(false);
  
      if (audioElement) {
        audioElement.addEventListener('ended', handleAudioEnd);
      }
  
      // Handling clicks outside the widget
      const handleClickOutside = (event) => {
        if (widgetRef.current && !widgetRef.current.contains(event.target)) {
          setShowLanguageSelector(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      // Cleanup function
      return () => {
        if (audioElement) {
          audioElement.removeEventListener('ended', handleAudioEnd);
        }
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    return (
      <div ref={widgetRef} className={styles['myWidget-container']}>
        <ActionButton state={isLoading ? 'loading' : isPlaying ? 'stop' : 'play'} onClick={handleActionClick} />
        <LanguageButton onClick={() => setShowLanguageSelector(!showLanguageSelector)} />
        {showLanguageSelector && (
          <>
            <VoiceSelector voiceId={voiceId} setVoiceId={setVoiceId} isVisible={showLanguageSelector} />
            <LanguageSelector language={language} setLanguage={setLanguage} isVisible={showLanguageSelector} />
          </>
        )}
        <AudioPlayer ref={audioRef} />
      </div>
    );
  };
  
  export default Widget;