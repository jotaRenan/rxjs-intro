import { Subject, fromEvent } from "rxjs";
import { map, filter, distinctUntilChanged, tap, switchMap } from "rxjs/operators";
import { fingirAsync, speak } from "./utils";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
}
const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;

const recognition = new webkitSpeechRecognition();
fromEvent(recognition, `result`)
    .pipe(
        map((event: any) => event.results[0][0].transcript),
        filter(texto => texto.length > 1),
        distinctUntilChanged(),
        tap(texto => console.log(texto)),
        switchMap(fingirAsync),
    )
    .subscribe(speak);

document.querySelector('#gravar').addEventListener('click', () => recognition.start());
document.querySelector('#parar').addEventListener('click', () => recognition.stop());