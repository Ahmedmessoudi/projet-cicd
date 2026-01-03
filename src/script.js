/**
 * Calculatrice - Mini Projet CI/CD
 * Fonctions mathématiques exportables pour les tests Jest
 */

// ============================================
// Fonctions mathématiques (exportables pour Jest)
// ============================================

/**
 * Addition de deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre
 * @returns {number} Somme des deux nombres
 */
function add(a, b) {
    return a + b;
}

/**
 * Soustraction de deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre
 * @returns {number} Différence des deux nombres
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiplication de deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre
 * @returns {number} Produit des deux nombres
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Division de deux nombres
 * @param {number} a - Dividende
 * @param {number} b - Diviseur
 * @returns {number|string} Quotient ou message d'erreur
 */
function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}

/**
 * Calcul du pourcentage
 * @param {number} value - Valeur
 * @param {number} percentage - Pourcentage à calculer
 * @returns {number} Résultat du pourcentage
 */
function percentage(value, percent) {
    return (value * percent) / 100;
}

/**
 * Vérifie si une valeur est un nombre valide
 * @param {*} value - Valeur à vérifier
 * @returns {boolean} True si c'est un nombre valide
 */
function isValidNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

// ============================================
// Logique de la calculatrice (UI)
// ============================================

let currentExpression = '';
let lastResult = '0';

/**
 * Met à jour l'affichage de la calculatrice
 */
function updateDisplay() {
    const expressionElement = document.getElementById('expression');
    const resultElement = document.getElementById('result');
    
    if (expressionElement && resultElement) {
        expressionElement.textContent = currentExpression;
        resultElement.textContent = lastResult;
    }
}

/**
 * Ajoute un caractère à l'expression
 * @param {string} value - Caractère à ajouter
 */
function appendToDisplay(value) {
    currentExpression += value;
    updateDisplay();
}

/**
 * Ajoute un opérateur à l'expression
 * @param {string} operator - Opérateur à ajouter
 */
function appendOperator(operator) {
    // Évite les opérateurs consécutifs
    const lastChar = currentExpression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentExpression = currentExpression.slice(0, -1);
    }
    currentExpression += operator;
    updateDisplay();
}

/**
 * Efface l'affichage
 */
function clearDisplay() {
    currentExpression = '';
    lastResult = '0';
    updateDisplay();
}

/**
 * Calcule le résultat de l'expression
 */
function calculate() {
    try {
        if (currentExpression === '') {
            return;
        }
        
        // Évalue l'expression de manière sécurisée
        const result = Function('"use strict"; return (' + currentExpression + ')')();
        
        if (isValidNumber(result)) {
            // Arrondir pour éviter les erreurs de précision flottante
            lastResult = parseFloat(result.toPrecision(12)).toString();
        } else {
            lastResult = 'Error';
        }
    } catch (error) {
        lastResult = 'Error';
    }
    
    updateDisplay();
}

// ============================================
// Export pour les tests (Node.js/Jest)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        add,
        subtract,
        multiply,
        divide,
        percentage,
        isValidNumber
    };
}
