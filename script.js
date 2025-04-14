const listaPalavras = [
    "acaso", "brisa", "campo", "dedos", "elite", "folha", "gente", "honra", "ideal",
    "jogar", "luzes", "morte", "navio", "opcao", "pazem", "quase", "risos", "salas",
    "tempo", "uniao", "vasto", "zelar"
  ];
  
  let palavraCorreta = "";
  let tentativaAtual = [];
  let linhaAtual = 0;
  let finalizado = false;
  
  const grid = document.getElementById("grid");
  const mensagem = document.getElementById("mensagem");
  const btnReiniciar = document.getElementById("reiniciar");
  
  const linhas = 6;
  const colunas = 5;
  
  function criarGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < linhas; i++) {
      const linha = document.createElement("div");
      linha.classList.add("linha");
      for (let j = 0; j < colunas; j++) {
        const celula = document.createElement("div");
        celula.classList.add("celula");
        celula.setAttribute("id", `celula-${i}-${j}`);
        linha.appendChild(celula);
      }
      grid.appendChild(linha);
    }
  }
  
  function inserirLetra(letra) {
    if (tentativaAtual.length < colunas && !finalizado) {
      tentativaAtual.push(letra.toLowerCase());
      atualizarGrid();
    }
  }
  
  function removerLetra() {
    if (tentativaAtual.length > 0 && !finalizado) {
      tentativaAtual.pop();
      atualizarGrid();
    }
  }
  
  function atualizarGrid() {
    for (let i = 0; i < colunas; i++) {
      const celula = document.getElementById(`celula-${linhaAtual}-${i}`);
      celula.textContent = tentativaAtual[i] ? tentativaAtual[i].toUpperCase() : "";
    }
  }
  
  function mostrarMensagem(msg, tempo = 1500) {
    mensagem.textContent = msg;
    mensagem.style.opacity = 1;
    setTimeout(() => {
      mensagem.style.opacity = 0;
    }, tempo);
  }
  
  function verificarPalavra() {
    if (tentativaAtual.length !== colunas || finalizado) return;
  
    const tentativa = tentativaAtual.join("");
  
    if (!listaPalavras.includes(tentativa)) {
      mostrarMensagem("Palavra inválida");
      return;
    }
  
    const letrasPalavra = palavraCorreta.split("");
    const letrasTentativa = tentativaAtual.slice();
    const cores = Array(colunas).fill("errado");
  
    // Verifica letras na posição correta
    for (let i = 0; i < colunas; i++) {
      if (letrasTentativa[i] === letrasPalavra[i]) {
        cores[i] = "correto";
        letrasPalavra[i] = null;
      }
    }
  
    // Verifica letras corretas fora de posição
    for (let i = 0; i < colunas; i++) {
      if (cores[i] === "correto") continue;
      const idx = letrasPalavra.indexOf(letrasTentativa[i]);
      if (idx !== -1) {
        cores[i] = "parcial";
        letrasPalavra[idx] = null;
      }
    }
  
    // Anima a revelação das cores
    for (let i = 0; i < colunas; i++) {
      const celula = document.getElementById(`celula-${linhaAtual}-${i}`);
      setTimeout(() => {
        celula.classList.add(cores[i]);
      }, i * 300);
    }
  
    if (tentativa === palavraCorreta) {
      mostrarMensagem("🎉 Você acertou!");
      finalizado = true;
      return;
    }
  
    linhaAtual++;
    tentativaAtual = [];
  
    if (linhaAtual === linhas) {
      mostrarMensagem(`❌ Você perdeu! A palavra era: ${palavraCorreta.toUpperCase()}`, 4000);
      finalizado = true;
    }
  }
  
  function novoJogo() {
    linhaAtual = 0;
    tentativaAtual = [];
    finalizado = false;
    palavraCorreta = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    criarGrid();
    mensagem.textContent = "";
    console.log("Palavra correta (debug):", palavraCorreta);
  }
  
  btnReiniciar.addEventListener("click", novoJogo);
  
  // Suporte ao teclado físico
  document.addEventListener("keydown", (e) => {
    if (finalizado) return;
  
    const tecla = e.key.toLowerCase();
  
    if (tecla === "enter") {
      verificarPalavra();
    } else if (tecla === "backspace") {
      removerLetra();
    } else if (/^[a-zç]$/.test(tecla) && tecla.length === 1) {
      inserirLetra(tecla);
    }
  });
  
  // Inicia o jogo ao carregar a página
  novoJogo();
  function verificarPalavra() {
    if (tentativaAtual.length !== colunas || finalizado) return;
  
    const tentativa = tentativaAtual.join("");
  
    if (!listaPalavras.includes(tentativa)) {
      mostrarMensagem("Palavra inválida");
      return;
    }
  
    const letrasPalavra = palavraCorreta.split("");
    const letrasTentativa = tentativaAtual.slice();
    const cores = Array(colunas).fill("errado");
  
    for (let i = 0; i < colunas; i++) {
      if (letrasTentativa[i] === letrasPalavra[i]) {
        cores[i] = "correto";
        letrasPalavra[i] = null;
      }
    }
  
    for (let i = 0; i < colunas; i++) {
      if (cores[i] === "correto") continue;
      const idx = letrasPalavra.indexOf(letrasTentativa[i]);
      if (idx !== -1) {
        cores[i] = "parcial";
        letrasPalavra[idx] = null;
      }
    }
  
    for (let i = 0; i < colunas; i++) {
      const celula = document.getElementById(`celula-${linhaAtual}-${i}`);
      setTimeout(() => {
        celula.classList.add("animada");
        celula.classList.add(cores[i]);
      }, i * 300);
    }
  
    if (tentativa === palavraCorreta) {
      setTimeout(() => {
        mostrarParabens();
        finalizado = true;
      }, colunas * 300);
      return;
    }
  
    linhaAtual++;
    tentativaAtual = [];
  
    if (linhaAtual === linhas) {
      setTimeout(() => {
        mostrarMensagem(`❌ Você perdeu! A palavra era: ${palavraCorreta.toUpperCase()}`, 4000);
        finalizado = true;
      }, colunas * 300);
    }
  }
  
  function mostrarMensagem(msg, tempo = 1500) {
    mensagem.textContent = msg;
    mensagem.classList.remove("parabens");
    mensagem.style.opacity = 1;
    setTimeout(() => {
      mensagem.style.opacity = 0;
    }, tempo);
  }
  
  function mostrarParabens() {
    mensagem.textContent = "🎉 Você acertou! Parabéns!";
    mensagem.classList.add("parabens");
  }
  
  function novoJogo() {
    linhaAtual = 0;
    tentativaAtual = [];
    finalizado = false;
    palavraCorreta = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
    criarGrid();
    mensagem.textContent = "";
    mensagem.classList.remove("parabens");
    console.log("Palavra correta (debug):", palavraCorreta);
  }
  function novoJogo() {
    // anima botão
    btnReiniciar.classList.add("animar");
  
    // anima grid de saída
    grid.classList.add("animar-saida");
  
    // após animação, reinicia o jogo
    setTimeout(() => {
      linhaAtual = 0;
      tentativaAtual = [];
      finalizado = false;
      palavraCorreta = listaPalavras[Math.floor(Math.random() * listaPalavras.length)];
      criarGrid();
      mensagem.textContent = "";
      mensagem.classList.remove("parabens");
  
      // anima grid de entrada
      grid.classList.remove("animar-saida");
      grid.classList.add("animar-entrada");
  
      // remove animações temporárias
      setTimeout(() => {
        grid.classList.remove("animar-entrada");
        btnReiniciar.classList.remove("animar");
      }, 500);
    }, 400);
  }