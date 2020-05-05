import { fromEvent, Subject, } from "rxjs";
import { map, filter, distinctUntilChanged, tap, switchMap, throttleTime, flatMap } from "rxjs/operators";
import { speak, fingirAsync, throttle } from "../utils";

/**
 * 😜😜😜😜
 * Objetivo: criar um handler que faça as seguintes coisas em ordem:
 *  ❌ Execute no maximo uma vez a cada 200ms para evitar gargalos 
 *  ❌ Funcione para o evento 'input' 
 *  ❌ Faça trimming na string
 *  ❌ Ignore strings com comprimento <= 1
 *  ❌ Ignore o evento caso o texti seja igual ao do eventoanterior
 *  ❌ Imprima o texto no console
 *  ❌ Envie o texto para uma API externa e receba outro como resposta
 *  ❌ Passe o texto final para a funçao speak() definida no arquivo Utils
 */

const entrada = document.querySelector('#entrada');
entrada.addEventListener('input', handle);

let ultimoPesquisado = '';
async function handle(e: any) {
    const textoTrimmado = e.target.value.trim();
    if (textoTrimmado.length <= 1) return false;
    if (textoTrimmado === ultimoPesquisado) return false;
    ultimoPesquisado = textoTrimmado;
    const textoFinal = await fingirAsync(textoTrimmado);
    speak(textoFinal);
    console.log(textoTrimmado);
}

// const optimizedHandle = throttle(handle, 200);
// entrada.addEventListener('input', optimizedHandle);

/*
fromEvent(entrada, `input`)
    .pipe(
        throttleTime(200),
        map((e: any) => e.target.value.trim()),
        filter(texto => texto.length > 1),
        distinctUntilChanged(),
        switchMap(fingirAsync),
        tap(texto => console.log(texto)),
    )
    .subscribe(speak);
*/

