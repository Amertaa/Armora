import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { ProductConcept } from './sections/ProductConcept';
import { Collection } from './sections/Collection';
import { CaseShowcase } from './sections/CaseShowcase';
import { ScentStory } from './sections/ScentStory';
import { EverydayCarry } from './sections/EverydayCarry';
import { ScentFinder } from './sections/ScentFinder';
import { LeadForm } from './sections/LeadForm';
import { Footer } from './sections/Footer';
import { translations } from './data/translations';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { language, changeLanguage } = useLanguage();
  const [preferredScent, setPreferredScent] = useState('');
  const copy = translations[language];
  return (
    <>
      <Navbar copy={copy} language={language} onLanguage={changeLanguage} />
      <main id="main">
        <Hero copy={copy} />
        <div className="brand-ribbon" aria-hidden="true">
          <span>POCKET FRAGRANCE</span>
          <span>✳</span>
          <span>REUSABLE OBJECT</span>
          <span>✳</span>
          <span>PERSONAL STYLE</span>
          <span>✳</span>
          <span>CARRY A PLACE.</span>
        </div>
        <ProductConcept copy={copy} />
        <Collection
          copy={copy}
          language={language}
          onInterest={setPreferredScent}
        />
        <CaseShowcase copy={copy} />
        <ScentStory copy={copy} />
        <EverydayCarry copy={copy} />
        <ScentFinder
          copy={copy}
          language={language}
          onInterest={setPreferredScent}
        />
        <LeadForm
          copy={copy}
          preferredScent={preferredScent}
          onPreferredScent={setPreferredScent}
        />
      </main>
      <Footer copy={copy} language={language} onLanguage={changeLanguage} />
    </>
  );
}
