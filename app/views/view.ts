export abstract class View<T> {
    protected elemento: HTMLElement;
    protected escapar: boolean = false

    constructor(seletor: string, escapar?: boolean) {
        const elemento = <HTMLInputElement>document.querySelector(seletor)
        if (elemento) {
            this.elemento = <HTMLElement>elemento
        }

        else {
            throw Error(`Selector ${seletor} não existe no DOM`)
        }

        if(escapar) {
            this.escapar = escapar
        }
    }

    protected abstract template(model: T): string

    public update(model: T): void {
        let template = this.template(model)
        if(this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '')
        }
        this.elemento.innerHTML = template
    }
}