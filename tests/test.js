/**
 * Tests unitaires pour la calculatrice
 * Mini Projet CI/CD avec Jenkins
 */

const { add, subtract, multiply, divide, percentage, isValidNumber } = require('../src/script');

// ============================================
// Tests pour la fonction add()
// ============================================
describe('add()', () => {
    test('should add two positive numbers', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('should add negative numbers', () => {
        expect(add(-2, -3)).toBe(-5);
    });

    test('should add positive and negative numbers', () => {
        expect(add(5, -3)).toBe(2);
    });

    test('should handle zero', () => {
        expect(add(0, 5)).toBe(5);
        expect(add(5, 0)).toBe(5);
    });

    test('should handle decimal numbers', () => {
        expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
});

// ============================================
// Tests pour la fonction subtract()
// ============================================
describe('subtract()', () => {
    test('should subtract two positive numbers', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test('should subtract negative numbers', () => {
        expect(subtract(-5, -3)).toBe(-2);
    });

    test('should handle zero', () => {
        expect(subtract(5, 0)).toBe(5);
        expect(subtract(0, 5)).toBe(-5);
    });

    test('should handle decimal numbers', () => {
        expect(subtract(0.5, 0.2)).toBeCloseTo(0.3);
    });
});

// ============================================
// Tests pour la fonction multiply()
// ============================================
describe('multiply()', () => {
    test('should multiply two positive numbers', () => {
        expect(multiply(4, 3)).toBe(12);
    });

    test('should multiply with negative numbers', () => {
        expect(multiply(-4, 3)).toBe(-12);
        expect(multiply(-4, -3)).toBe(12);
    });

    test('should handle zero', () => {
        expect(multiply(5, 0)).toBe(0);
        expect(multiply(0, 5)).toBe(0);
    });

    test('should handle decimal numbers', () => {
        expect(multiply(0.5, 0.2)).toBeCloseTo(0.1);
    });
});

// ============================================
// Tests pour la fonction divide()
// ============================================
describe('divide()', () => {
    test('should divide two positive numbers', () => {
        expect(divide(10, 2)).toBe(5);
    });

    test('should handle division with negative numbers', () => {
        expect(divide(-10, 2)).toBe(-5);
        expect(divide(10, -2)).toBe(-5);
    });

    test('should return error for division by zero', () => {
        expect(divide(10, 0)).toBe('Error: Division by zero');
    });

    test('should handle decimal results', () => {
        expect(divide(1, 3)).toBeCloseTo(0.333, 2);
    });

    test('should handle decimal inputs', () => {
        expect(divide(0.6, 0.2)).toBeCloseTo(3);
    });
});

// ============================================
// Tests pour la fonction percentage()
// ============================================
describe('percentage()', () => {
    test('should calculate percentage correctly', () => {
        expect(percentage(100, 50)).toBe(50);
    });

    test('should handle 100%', () => {
        expect(percentage(200, 100)).toBe(200);
    });

    test('should handle 0%', () => {
        expect(percentage(100, 0)).toBe(0);
    });

    test('should handle decimal percentages', () => {
        expect(percentage(100, 12.5)).toBe(12.5);
    });
});

// ============================================
// Tests pour la fonction isValidNumber()
// ============================================
describe('isValidNumber()', () => {
    test('should return true for valid numbers', () => {
        expect(isValidNumber(5)).toBe(true);
        expect(isValidNumber(-5)).toBe(true);
        expect(isValidNumber(0)).toBe(true);
        expect(isValidNumber(3.14)).toBe(true);
    });

    test('should return false for NaN', () => {
        expect(isValidNumber(NaN)).toBe(false);
    });

    test('should return false for Infinity', () => {
        expect(isValidNumber(Infinity)).toBe(false);
        expect(isValidNumber(-Infinity)).toBe(false);
    });

    test('should return false for non-numbers', () => {
        expect(isValidNumber('5')).toBe(false);
        expect(isValidNumber(null)).toBe(false);
        expect(isValidNumber(undefined)).toBe(false);
    });
});
