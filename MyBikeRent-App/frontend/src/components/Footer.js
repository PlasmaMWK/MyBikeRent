import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MyBikeRent</h3>
          <p>La plateforme de location de motos entre particuliers</p>
        </div>
        
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><a href="/a-propos">À propos</a></li>
            <li><a href="/conditions">Conditions d'utilisation</a></li>
            <li><a href="/confidentialite">Politique de confidentialité</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@mybikerent.fr</p>
          <p>Téléphone: 01 23 45 67 89</p>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MyBikeRent - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;