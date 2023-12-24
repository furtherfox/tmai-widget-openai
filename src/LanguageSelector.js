import React from 'react';
import styles from './Widget.module.css';

const LanguageSelector = React.forwardRef(({ language, setLanguage, isVisible }, ref) => (
  <select
    ref={ref}
    className={`${styles['myWidget-language-selector']} ${isVisible ? styles.visible : ''}`}
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="" disabled>Choose a Language</option> {/* Removed the selected attribute */}
    <option value="Afrikaans">Afrikaans</option>
    <option value="Arabic">Arabic</option>
    <option value="Armenian">Armenian</option>
    <option value="Azerbaijani">Azerbaijani</option>
    <option value="Belarusian">Belarusian</option>
    <option value="Bosnian">Bosnian</option>
    <option value="Bulgarian">Bulgarian</option>
    <option value="Catalan">Catalan</option>
    <option value="Chinese">Chinese</option>
    <option value="Croatian">Croatian</option>
    <option value="Czech">Czech</option>
    <option value="Danish">Danish</option>
    <option value="Dutch">Dutch</option>
    <option value="English">English</option>
    <option value="Estonian">Estonian</option>
    <option value="Finnish">Finnish</option>
    <option value="French">French</option>
    <option value="Galician">Galician</option>
    <option value="German">German</option>
    <option value="Greek">Greek</option>
    <option value="Hebrew">Hebrew</option>
    <option value="Hindi">Hindi</option>
    <option value="Hungarian">Hungarian</option>
    <option value="Icelandic">Icelandic</option>
    <option value="Indonesian">Indonesian</option>
    <option value="Italian">Italian</option>
    <option value="Japanese">Japanese</option>
    <option value="Kannada">Kannada</option>
    <option value="Kazakh">Kazakh</option>
    <option value="Korean">Korean</option>
    <option value="Latvian">Latvian</option>
    <option value="Lithuanian">Lithuanian</option>
    <option value="Macedonian">Macedonian</option>
    <option value="Malay">Malay</option>
    <option value="Marathi">Marathi</option>
    <option value="Maori">Maori</option>
    <option value="Nepali">Nepali</option>
    <option value="Norwegian">Norwegian</option>
    <option value="Persian">Persian</option>
    <option value="Polish">Polish</option>
    <option value="Portuguese">Portuguese</option>
    <option value="Romanian">Romanian</option>
    <option value="Russian">Russian</option>
    <option value="Serbian">Serbian</option>
    <option value="Slovak">Slovak</option>
    <option value="Slovenian">Slovenian</option>
    <option value="Spanish">Spanish</option>
    <option value="Swahili">Swahili</option>
    <option value="Swedish">Swedish</option>
    <option value="Tagalog">Tagalog</option>
    <option value="Tamil">Tamil</option>
    <option value="Thai">Thai</option>
    <option value="Turkish">Turkish</option>
    <option value="Ukrainian">Ukrainian</option>
    <option value="Urdu">Urdu</option>
    <option value="Vietnamese">Vietnamese</option>
    <option value="Welsh">Welsh</option>
  </select>
));

export default LanguageSelector;
