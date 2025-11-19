// This is where the JavaScript logic would go in a separate script.js file.
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    const buttons = document.querySelectorAll('.calc-btn');

    let currentInput = '0';
    let currentExpression = '';
    let resultCalculated = false;

    // Function to update the display
    const updateDisplay = () => {
        display.textContent = formatNumber(currentInput);
        history.textContent = currentExpression.replace(/\*/g, '×').replace(/\//g, '÷');
         // Scroll display to the right to show the latest input
        display.scrollLeft = display.scrollWidth;
    };

    // Function to format numbers with commas for better readability
    const formatNumber = (num) => {
        if (typeof num !== 'string') num = num.toString();
        const [integer, decimal] = num.split('.');
        const formattedInteger = new Intl.NumberFormat('en-US').format(integer);
        return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
    };
    
    // Main function to handle button clicks
    const handleButtonClick = (value) => {
        // Number input
        if (!isNaN(value) || value === '.') {
            if (resultCalculated) {
                currentInput = value;
                currentExpression = value;
                resultCalculated = false;
            } else {
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else if (value === '.' && currentInput.includes('.')) {
                    return; // Prevent multiple decimals
                } else {
                    currentInput += value;
                }
                currentExpression += value;
            }
        } 
        // Operator input
        else if (['+', '-', '*', '/', '%', '^'].includes(value)) {
            if (resultCalculated) {
                currentExpression = currentInput;
                resultCalculated = false;
            }
            currentInput = '0';
            currentExpression += value;
        } 
        // Special functions and actions
        else {
            switch (value) {
                case 'C':
                    currentInput = '0';
                    currentExpression = '';
                    resultCalculated = false;
                    break;
                case 'DEL':
                    if (resultCalculated) break;
                    if (currentInput.length > 1) {
                        currentInput = currentInput.slice(0, -1);
                    } else {
                        currentInput = '0';
                    }
                    // Also remove from the main expression
                    currentExpression = currentExpression.slice(0, -1);
                    break;
                case '=':
                    calculateResult();
                    break;
                case 'sin':
                case 'cos':
                case 'tan':
                case 'log':
                case 'ln':
                case 'sqrt':
                    handleFunction(value);
                    break;
                case 'pi':
                    handleConstant(Math.PI, 'π');
                    break;
                case 'e':
                    handleConstant(Math.E, 'e');
                    break;
                case 'fact':
                    calculateFactorial();
                    break;
                case '^2':
                   handleSquare();
                   break;
                case 'negate':
                   handleNegate();
                   break;
                case '(':
                case ')':
                   currentExpression += value;
                   break;

            }
        }
        updateDisplay();
    };
    
    // Function to handle parenthesis and constants
    const handleConstant = (constantValue, symbol) => {
        if(resultCalculated || currentInput === '0'){
            currentInput = constantValue.toString();
            currentExpression = symbol;
            resultCalculated = false;
        } else {
            currentInput = constantValue.toString();
            currentExpression += symbol;
        }
    };
    
    // Function to handle unary functions like sin, cos, etc.
    const handleFunction = (func) => {
         currentExpression = `${func}(${currentExpression})`;
         calculateResult();
    };
    
    const handleSquare = () => {
        currentExpression = `(${currentExpression})^2`;
        calculateResult();
    };

    const handleNegate = () => {
        if (currentInput !== '0') {
            // Find the last number in the expression to negate it
            const numbers = currentExpression.split(/[\+\-\*\/\^\(\)]+/);
            let lastNumber = numbers[numbers.length - 1];
            if (lastNumber) {
                const position = currentExpression.lastIndexOf(lastNumber);
                if (currentExpression[position-1] === '-' && currentExpression[position-2] === '(') {
                   // It's already negative, like (-5). Make it positive.
                   currentExpression = currentExpression.substring(0, position - 2) + lastNumber + currentExpression.substring(position + lastNumber.length + 1);
                } else {
                   // Make it negative
                   currentExpression = currentExpression.substring(0, position) + `(-${lastNumber})` + currentExpression.substring(position + lastNumber.length);
                }
            }
            calculateResult();
        }
    }
    
    // Factorial calculation
    const calculateFactorial = () => {
        try {
            const num = parseFloat(evalForCalculation(currentExpression));
            if (num < 0 || !Number.isInteger(num)) {
                currentInput = 'Error';
                return;
            }
            if (num === 0) {
                currentInput = '1';
                currentExpression = '1';
                return;
            }
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            currentInput = result.toString();
            currentExpression = result.toString();
        } catch (e) {
            currentInput = 'Error';
        }
        resultCalculated = true;
    };

    // Pre-process expression for safe evaluation
    const evalForCalculation = (expr) => {
        return expr
            .replace(/π/g, `(${Math.PI})`)
            .replace(/e/g, `(${Math.E})`)
            .replace(/\^/g, '**')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan');
    };

    // Main calculation logic
    const calculateResult = () => {
        try {
            const processedExpression = evalForCalculation(currentExpression);
            // Using Function constructor for safer evaluation than eval()
            const result = new Function('return ' + processedExpression)();

            if (isNaN(result) || !isFinite(result)) {
                currentInput = 'Error';
            } else {
                // Round to a reasonable number of decimal places
                currentInput = parseFloat(result.toFixed(10)).toString();
            }
            resultCalculated = true;
        } catch (error) {
            console.error("Calculation Error:", error);
            currentInput = 'Error';
            resultCalculated = true;
        }
    };
    
    // Add click listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.dataset.value);
        });
    });

    // Add keyboard support for a better user experience
    document.addEventListener('keydown', (e) => {
        e.preventDefault(); // Prevent default browser actions
        const key = e.key;
        
        if (key >= '0' && key <= '9' || key === '.') handleButtonClick(key);
        if (['+', '-', '*', '/'].includes(key)) handleButtonClick(key);
        if (key === 'Enter' || key === '=') handleButtonClick('=');
        if (key === 'Backspace') handleButtonClick('DEL');
        if (key === 'Escape' || key === 'c' || key === 'C') handleButtonClick('C');
        if (key === '(') handleButtonClick('(');
        if (key === ')') handleButtonClick(')');
        if (key === '%') handleButtonClick('%');
        if (key === '^') handleButtonClick('^');

    });

    // Initialize display on load
    updateDisplay();
});