
import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

export class CpfValidator implements Validator {

    static cpfLength = 11;

    /**
    * Calcula o dígito verificador do CPF ou CNPJ.
    */
    static buildDigit(arr: number[]): number {
        const isCpf = arr.length < CpfValidator.cpfLength;
        const digit = arr
            .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
            .reduce((total, current) => total + current) % CpfValidator.cpfLength;

        if (digit < 2 && isCpf) return 0;

        return CpfValidator.cpfLength - digit;
    }

    /**
    * Valida um CPF ou CNPJ de acordo com seu dígito verificador.
    */
    static validate(c: AbstractControl): ValidationErrors | null {

        const cpf = c.value.replace(/\D/g, '');

        // Verifica o tamanho da string.
        if ([CpfValidator.cpfLength].indexOf(cpf.length) < 0) {
            return { length: true };
        }

        // Verifica se todos os dígitos são iguais.
        if (/^([0-9])\1*$/.test(cpf)) {
            return { equalDigits: true };
        }

        // A seguir é realizado o cálculo verificador.
        const cpfArr: number[] = cpf.split('').reverse().slice(2);

        cpfArr.unshift(CpfValidator.buildDigit(cpfArr));
        cpfArr.unshift(CpfValidator.buildDigit(cpfArr));

        if (cpf !== cpfArr.reverse().join('')) {
            // Dígito verificador não é válido, resultando em falha.
            return { digit: true };
        }

        return null;
    }

    /**
    * Implementa a interface de um validator.
    */
    validate(c: AbstractControl): ValidationErrors | null {
        return CpfValidator.validate(c);
    }
}
