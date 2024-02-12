import './Welcome.css'
import logoOP from '../img/logoOnePiece.png';

function Welcome() {
    return (
        <div id='welcome'> 
            <h2>Seja bem-vindo!</h2>
            <p>Clique no botão abaixo para começar:</p>
            <button>Iniciar</button>
            <img src={logoOP} alt="Início do Quiz" />
        </div>
    )
}

export default Welcome