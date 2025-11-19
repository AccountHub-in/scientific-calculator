# 🧮 Scientific Calculator

A fully functional, responsive scientific calculator built using vanilla HTML, Tailwind CSS, and JavaScript. It features a modern dark-mode design with a frosted glass effect and comprehensive mathematical capabilities, including trigonometric functions, logarithms, and factorials.

# ✨ Features

This calculator provides a wide range of features suitable for both basic arithmetic and complex scientific calculations:

Core Arithmetic: Supports addition (+), subtraction (-), multiplication (×), and division (÷).

Scientific Functions: Includes sin, cos, tan, log (base 10), ln (natural log), square root (√), and factorial (n!).

Constants & Exponents: Access to Pi (π) and Euler's number (e), along with functions for powers (xʸ) and squaring (x²).

Advanced Controls: Clear All (C), Backspace/Delete (⌫), Percentage (%), and Negate (+/-).

Expression History: Displays the full expression being entered above the main output screen for clarity.

Responsive Design: Optimized for seamless use across desktop, tablet, and mobile devices.

Keyboard Support: Full operability using the keyboard for numbers, operators, Enter (=), and Backspace (DEL).

Modern Aesthetics: Stylish dark theme utilizing a frosted glass (backdrop-filter) effect for a premium look and feel.

# 🚀 Getting Started

To run this calculator locally, you only need a web browser. Since all necessary code is included in the project files, no build process or server is required.

Prerequisites

A modern web browser (Chrome, Firefox, Edge, Safari, etc.).

Installation
Clone the repository


Run the application:
Open the index.html file directly in your web browser.

open index.html 


# 💻 Technologies Used

HTML5: Structure and content.

Tailwind CSS: Utility-first framework for rapid, responsive styling. (Loaded via CDN).

Custom CSS: Used in style.css for aesthetic enhancements like the frosted glass effect and button feedback.

Vanilla JavaScript: Handles all the calculation logic, expression parsing, and DOM manipulation in script.js.

# 📂 File Structure

The project follows a standard three-file structure:

   1. index.html          # Main structure, loads CSS and JS files.
   2. style.css           # Custom styles (frosted glass, button effects).
   3. script.js           # Core application logic (input handling, calculation engine).


# ✍️ Usage and Logic

The calculator uses a currentExpression string to track all input (including functions and parentheses) and evaluates it safely when the = button is pressed.

Key Logic Highlights in script.js:

Safe Evaluation: The evalForCalculation function pre-processes the expression to replace user-friendly symbols (like π and ^) with their JavaScript equivalents (Math.PI and **) before using the new Function() constructor for calculation, which is safer than a direct eval().

Display Formatting: Numbers are formatted with commas (Intl.NumberFormat) for enhanced readability.

Responsive Input: The display automatically scrolls horizontally to show the latest input if the expression exceeds the screen width.

Factorial: The calculateFactorial function ensures the input is a non-negative integer before performing the calculation.

# 🤝 Contribution

Feel free to fork the repository and contribute. Suggestions for improving the calculation engine, adding new scientific functions, or optimizing the UI/UX are welcome!


# 🤝 Contact

Feel free to reach out to me!

GitHub: AccountHub-in

Email: s.https.mail@gmail.com

Twitter/X: @realsatishaxe

project link: https://accounthub-in.github.io/scientific-calculator/
