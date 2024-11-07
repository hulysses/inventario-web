export function validarQuantidade(qtd: string): boolean {
    const qtds = parseInt(qtd);
    return Number.isInteger(qtds) && qtds >= 0;
}

export function isValidImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);

        img.src = url;
    });
}

export function validarPreco(preco: string): boolean {
    const precoFloat = parseFloat(preco);
    return precoFloat > 0;
}