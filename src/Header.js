import leftSwallow from './assets/left-swallow.png';
import rightSwallow from './assets/right-swallow.png';

function Header() {
  return(
    <header>
      <h1>A tattoo tally</h1>
      <img className="left-swallow" src={leftSwallow} alt="a traditional swallow tattoo facing right" />
      <img className="right-swallow" src={rightSwallow} alt="a traditional swallow tattoo facing left" />
    </header>
  )
}

export default Header;