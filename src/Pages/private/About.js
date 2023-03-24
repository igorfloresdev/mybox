import React from 'react'

const About = () => {
  return (
    <div className="w-8/12 text-lg">
      <h2 className="text-2xl text-center">Obrigado por visitar ❤️</h2>
      <br />
      <p>
        O projeto MyBox foi criado com intuito de reforçar e praticar todo o meu conhecimento em programaçao,
        utilizando a biblioteca React.js, e Tailwind CSS.
      </p>
      <br />
      <p>
        Nesse projeto também foram utilizados alguns pacotes como o react-cookie para armazenar a autenticação do usuário
        , json-server para simular uma API REST e outros pacotes. Caso queira conferir a lista completa você pode conferir a documentação e codigo
        no repositório <b><a href="https://github.com/igorfloresdev/mybox" target='_blank' rel="noreferrer">https://github.com/igorfloresdev/mybox</a></b>
      </p>
      <br />
      <p>
        Você também pode conferir meus outros projetos em <b><a href="https://igorfloresdev.github.io" target='_blank' rel="noreferrer">https://igorfloresdev.github.io</a></b> e no meu Github <b><a href="https://github.com/igorfloresdev/mybox" rel="noreferrer" target='_blank'>https://github.com/igorfloresdev/</a></b>
      </p>
      <br />
      <p>
        Caso tenha alguma dúvida ou sugestão, você pode entrar em contato comigo através do e-mail: <b><a href="mailto:dev.igorflores@gmail.com">dev.igorflores@gmail.com</a></b>
      </p>
      <br />
      <h2 className="text-center text-2xl">Keep Coding ✨</h2>
      <div className="flex justify-center py-10">
        <img src="https://camo.githubusercontent.com/5e28d07e9680f89257a8aac55742ac99981439d7cea49f762fee4c894b221e2e/68747470733a2f2f632e74656e6f722e636f6d2f79324a586b593170586b7741414141432f6361742d636f6d70757465722e676966" alt='Gato digitando no teclado' />
      </div>
      <p className="text-center text-xl"> Esse projeto foi feito com muito ❤️ e ☕ por Igor Flores </p>
    </div>
  )
}

export default About