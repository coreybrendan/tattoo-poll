import footerArt from './assets/footer-art.png';

function Footer() {
  return(
    <footer>
      <p>Crafted by Corey Sheldrick</p>
      <p>at <a href="https://junocollege.com/">Juno College</a></p>
      <p>in Toronto, Ontario.</p>
      <img src={footerArt} alt="An island scene with palm trees, and mountains." />
    </footer>
  )
}

export default Footer;