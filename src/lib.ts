export function isNumber(num:string):boolean{
    return /^\d+$/.test(num);
}

export function isAlphabet(char: string): boolean {
    return /^[a-zA-Z]+$/.test(char);
}

export function isSpecialCharacter(str: string): boolean {
    return !/^[a-zA-Z0-9]+$/.test(str);
}

export function createAlternatingCaps(alphabets: string[]): string {
    let allChars = '';
    alphabets.forEach(item => {
        for (let char of item) {
            if (/[a-zA-Z]/.test(char)) {
                allChars += char;
            }
        }
    });
    
    const reversed = allChars.split('').reverse().join('');
    
    let result = '';
    for (let i = 0; i < reversed.length; i++) {
        if (i % 2 === 0) {
            result += reversed[i].toUpperCase();
        } else {
            result += reversed[i].toLowerCase();
        }
    }
    
    return result;
}

