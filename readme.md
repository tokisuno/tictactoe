# Tic-Tac-Toe (in js)

## Post-project review
I think in the beginning I was using factories but got really confused and resorted to only using objects and constructors. It's not very elegant but it is functional and looks pretty decent. Feedback appreciated!

## Project
1. You are going to store the gameboard as an array inside of a Gameboard object.
2. Your players are going to be stored in objects.
3. You are probably going to want an object to control the flow of the game itself.

* Objective
    - Use functional scoping and closures
    - Have a working and nice looking tic-tac-toe clone
    - Write as little global code as possible
        * Tuck everything inside factories

* Hints
    - If you only need a single instance of *something* then wrap the factory inside a module pattern so it cannot be reused to create additional instances.
        * (i.e. gameboard, displayController, etc...)
