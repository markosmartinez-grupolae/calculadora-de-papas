    function getEdad(dateString) {
      let hoy = new Date();
      let fechaNacimiento = new Date(dateString);
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
      ) {
        edad--;
      }
      return edad;
    }

    function papasVividos(fechaNacimiento) {
      const fechaNac = new Date(fechaNacimiento);
      const hoy = new Date();
      return papas.filter(papa => {
        const finPapa = new Date(papa.fin);
        const inicioPapa = new Date(papa.inicio);
        return finPapa >= fechaNac && inicioPapa <= hoy;
      });
    }

    function papasVividosSiNacisteEn(anyoNacimiento, edad) {
      const fechaAlternativa = new Date(anyoNacimiento, 0, 1);
      const fechaFinal = new Date(anyoNacimiento + edad, 0, 1);
      return papas.filter(papa => {
        const finPapa = new Date(papa.fin);
        const inicioPapa = new Date(papa.inicio);
        return finPapa >= fechaAlternativa && inicioPapa <= fechaFinal;
      });
    }

    function calcularPapas() {
      const fecha = document.getElementById('fecha').value;
      const resultado = document.getElementById('resultado');
      const alternativo = document.getElementById('alternativo');
      resultado.innerHTML = '';
      alternativo.innerHTML = '';

      if (!fecha) {
        resultado.innerHTML = '<span class="text-red-500 font-bold">¡Pon una fecha válida, pecador!</span>';
        return;
      }

      // Edad real
      const edad = getEdad(fecha);

      // Papas vividos
      const papasUser = papasVividos(fecha);

      // Buscar el año en que, con tu edad actual, hubieras vivido más papas
      let maxPapas = 0;
      let mejorAnyo = null;
      let papasMejor = [];
      for (let anyo = 1900; anyo <= (2025 - edad); anyo++) {
        const papasEnEseCaso = papasVividosSiNacisteEn(anyo, edad);
        if (papasEnEseCaso.length > maxPapas) {
          maxPapas = papasEnEseCaso.length;
          mejorAnyo = anyo;
          papasMejor = papasEnEseCaso;
        }
      }

      // Mostrar resultado principal
      resultado.innerHTML = `
        <div class="flex flex-col items-center">
          <span class="text-2xl font-extrabold text-yellow-600">Has vivido <span class="text-3xl">${papasUser.length}</span> papas.</span>
          <span class="italic text-gray-600">(${papasUser.map(p => p.nombre).join(', ')})</span>
          <img src="https://media.tenor.com/-E_0vQro5KYAAAAM/pope-francis-amen.gif" class="w-24 mt-2 rounded-full border-4 border-yellow-300 shadow-lg" alt="Pope Meme" />
        </div>
      `;

      // Mostrar resultado alternativo estilo meme
      if (mejorAnyo !== null && maxPapas > papasUser.length) {
        alternativo.innerHTML = `
          <div class="mt-4 p-3 bg-yellow-100 rounded-lg border-2 border-yellow-300">
            <span class="font-bold text-yellow-700">Si hubieras nacido en <span class="underline">${mejorAnyo}</span> y tuvieras tu edad actual (<b>${edad}</b> años)...<br>
            ¡Habrías vivido <span class="text-xl">${maxPapas}</span> papas!<br>
            <span class="italic text-gray-600">(${papasMejor.map(p => p.nombre).join(', ')})</span>
            <div class="mt-2 text-2xl">😱🙏</div>
          </div>
        `;
      } else {
        alternativo.innerHTML = `
          <div class="mt-4 p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <span class="font-bold text-yellow-700">¡Ya eres un experto en Papas!<br>
            No hay ningún año desde 1900 donde podrías haber vivido más papas con tu edad actual.</span>
            <div class="mt-2 text-2xl">🧑‍🎓🍕</div>
          </div>
        `;
      }
    }