import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const defaultState = `
  #include<stdio.h>
 
  int main(){
   printf("Hello World !");
   return 0;
  }
 
  `
  const [code, setCode] = useState(defaultState);
  const [output, setOutput] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const [isError, setError] = useState(false);

  async function onRun() {
    try {
      const response =  await fetch(`/api/compile`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });
  
      const output = await response.json();

      setError(output.error);
      setOutputMessage(output.message);
      setOutput(output?.result);
      
    } catch (error) {
      setOutput("");
      setOutputMessage(output.message);
      setError(false)
    }
  }


  function onChangeCode(event) {
    setCode(event.target.value)
  }


  function onClear() {
    setCode(defaultState);
    setOutput('');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Parrot NextGen C Compiler</title>
        <meta name="description" content="NextGeneration C Compiler" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/samayun/parrot-compiler">Parrot NextGen C Compiler</a>
        </h1>

        <div className="container">

          <p className={styles.run}>
            <button className='btn btn-success text-center' onClick={() => onRun()}> RUN  </button>
            <button className='btn btn-warning-outline text-center' onClick={() => onClear()}> CLEAR  </button>
          </p>
          <div className='row'>
            <div className='col-6'>
              <textarea className='w-100' rows={15} onChange={onChangeCode} value={code} />
            </div>
            <div className='col-6 bg-dark' >
              <p className='w-100 text-white'>
                { isError ? <i style={{color: 'red'}}>{outputMessage}</i> :  <i style={{color: 'green'}}>   {'>>' +outputMessage}</i> } <br></br>
                {output}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by  Samayun Chowdhury
        </a>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    </div>
  )
}
