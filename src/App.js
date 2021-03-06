import React, {useState} from 'react';
import './App.css';

import apisauce from 'apisauce';

function App() {
  const api = apisauce.create({
    baseURL: 'https://cavaloapp.com.br/comingsoonemail',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(false);


  const submit = async (email) => {
    console.log('email submit: ', email);
    setLoading(true);
    const resp = await api.post('/comingsoonemail', {email});
    console.log('resp: ', resp);
    setLoading(false);
    if (resp.data && resp.data.success) {
      setSuccess(true);
      setError(undefined);
    }  else {
      setSuccess(undefined);
      setError('Algo deu errado... por favor tente novamente!');
    }
  };

  const handleChange = (email) => { 
    setEmail(email); 
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={'/logo.png'} className="App-logo" alt="logo" />
        <p>
          O aplicativo <strong>CAVALO APP</strong> vem para unir em um só lugar todas as vertentes de trabalho relacionadas ao mundo equestre <br/>
          como leilões, veterinários, ferreiros, venda de animais, <br/><br/>
          além de vir com a proposta de se tornar a primeira rede social voltada ao mundo dos cavalos com o <strong>CLUBE DO CAVALO</strong>, <br/>
          onde os usuários poderão postar status e interagir.<br/>
        </p>
        <p>
          Cadastre seu melhor e-mail abaixo
        </p>
        {
          error ? (
          <p style={{color: 'red'}}>
            {error}
          </p>
          ) : null
        }
        {
          loading ? (
             null
          ) : (
            success === undefined ? (
            <form onSubmit={() => submit(document.getElementById('email').value)}>
              <input id="email" type="email" value={email} onChange={() => handleChange(document.getElementById('email').value)} />
              <input type="submit" value="Cadastrar" />
            </form>
            ) : (
              success ? (
                <p>
                  Agradecemos seu cadastro.<br/>
                  Fique atento, enviaremos mais informações por email.
                </p>
              ) : (
                null
              )
            )
          )
        }

      </header>
      
    </div>
  );
}

export default App;
