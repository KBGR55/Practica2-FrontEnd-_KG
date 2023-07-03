import logo from './../logo.svg';
import './../App.css';

const Principal = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p><code>K.G</code></p>
                <a className="App-link" href={"/sesion"} rel="noopener noreferrer">Practica</a>
            </header>
        </div >
    );
}

export default Principal;