export function speak(message: string) {
    const msg = new SpeechSynthesisUtterance(message)
    msg.lang = 'pt-br';
    window.speechSynthesis.speak(msg);
}

export async function fingirAsync(valor: string) {
    return Promise.resolve(valor);
}

export function throttle(callback: Function, limit: number) { // implementacao copiada de https://stackoverflow.com/a/55164486/7180873
    var wait = false;
    return function (...args: any) {
        if (!wait) {
            callback(...args);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}