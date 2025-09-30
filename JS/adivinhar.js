 let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

        const palpites = document.querySelector(".palpites");
        const ultimoResultado = document.querySelector(".ultimoResultado");
        const baixoOuAlto = document.querySelector(".baixoOuAlto");

        const enviarPalpite = document.querySelector(".enviarPalpite");
        const campoPalpite = document.querySelector(".campoPalpite");

        let contadorPalpite = 1;
        let resetarBotao;

        enviarPalpite.addEventListener("click", checarPalpite);

        function checarPalpite() {
            const palpiteUsuario = Number(campoPalpite.value);
            if (contadorPalpite === 1) {
                palpites.textContent = "Palpites anteriores: ";
            }

            palpites.textContent += palpiteUsuario + " ";

            if (palpiteUsuario === numeroAleatorio) {
                ultimoResultado.textContent = "Parabéns! Você acertou!";
                ultimoResultado.style.backgroundColor = "green";
                baixoOuAlto.textContent = "";
                setGameOver();
            } else if (contadorPalpite === 10) {
                ultimoResultado.textContent = "!!!GAME OVER!!!";
                baixoOuAlto.textContent = "";
                setGameOver();
            } else {
                ultimoResultado.textContent = "Errado!";
                ultimoResultado.style.backgroundColor = "red";
                if (palpiteUsuario < numeroAleatorio) {
                    baixoOuAlto.textContent = "O último palpite foi muito baixo!";
                } else if (palpiteUsuario > numeroAleatorio) {
                    baixoOuAlto.textContent = "O último palpite foi muito alto!";
                }
            }

            contadorPalpite++;
            campoPalpite.value = "";
            campoPalpite.focus();
        }

        function setGameOver() {
            campoPalpite.disabled = true;
            enviarPalpite.disabled = true;
            resetarBotao = document.createElement("button");
            resetarBotao.textContent = "Começar novo jogo";
            document.body.appendChild(resetarBotao);
            resetarBotao.addEventListener("click", resetGame);
        }

        function resetGame() {
            contadorPalpite = 1;
            const resetParas = document.querySelectorAll(".resultParas p");
            for (const resetPara of resetParas) {
                resetPara.textContent = "";
            }

            resetarBotao.parentNode.removeChild(resetarBotao);
            campoPalpite.disabled = false;
            enviarPalpite.disabled = false;
            campoPalpite.value = "";
            campoPalpite.focus();
            ultimoResultado.style.backgroundColor = "white";
            numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        }
