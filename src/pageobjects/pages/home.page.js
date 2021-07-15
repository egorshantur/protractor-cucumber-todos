const Page = require("./page");
const EC = protractor.ExpectedConditions;

class HomePage extends Page {
    get title() { return $('.header h1') }

    get newTodoInput() { return $('.new-todo') }
    get todosList() { return $$('.todo-list li') }

    get todoCountFullText() { return $('.todo-count') }
    get todoCountNumber() { return this.todoCountFullText.$('strong') }
    
    get clearCompletedButton() { return $('.clear-completed') }

    todo = (todoText) => {
        /**
         * Todo api. Used to manage todos
         * @param {string} todoText
         * @return {{option: Function}}
         */
        const todoElem = element(by.cssContainingText('.todo-list li', todoText));
        const editTodoInput = $('.edit');
        const deleteTodoIcon = todoElem.$('.destroy');
        const todoLabel = todoElem.$('label');
        const todoToogle = todoElem.$('.toggle');

        /**
         * Adds new todo with the specified todoText
         */
        const addTodo = async () => {
            await this.newTodoInput.sendKeys(todoText);
            await this.newTodoInput.sendKeys(protractor.Key.ENTER);
        };

        return {
            /**
             * Add new todo
             */
            add: async () => {
                return addTodo();
            },

            /**
             * Click todo
             */
            click: async () => {
                return todoElem.click();
            },

            /**
             * Doubleclick todo
             */
            doubleClick: async () => {
                await browser.actions().mouseMove(todoElem).perform();
                return browser.actions().doubleClick(todoElem).perform();
            },

            /**
             * Get Edit input
             */
            editTodoInput: () => {
                return editTodoInput            
            },

            /**
             * Wait for Edit todo input to be displayed
             */
            waitForEditInput: async () => {
                await browser.wait(EC.visibilityOf(editTodoInput), browser.params.waitTimeout, `[Edit Todo] Input with text ${todoText} is not displayed`);
            },
            
            /**
             * Clear todo text
             */
            clear: async () => {
                await editTodoInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'));
                await editTodoInput.sendKeys(protractor.Key.BACK_SPACE);
            },

            /**
             * Clear todo and set new text
             */
            setNewText: async (newTodoText) => {
                await this.todo().waitForEditInput();
                await this.todo().clear();
                await editTodoInput.sendKeys(newTodoText);
                await editTodoInput.sendKeys(protractor.Key.ENTER);
            },

            /**
             * Edit todo and add new text
             */
            addText: async (newTodoText) => {
                await editTodoInput.sendKeys(newTodoText);
                await editTodoInput.sendKeys(protractor.Key.ENTER);
            },

            /**
             * Delete todo
             */
            delete: async () => {
                await browser.actions().mouseMove(todoElem).perform();
                await deleteTodoIcon.click();
            },

            /**
             * Toogle todo
             */
            toggle: async () => {
                await todoToogle.click();
            },

            /**
             * Check if Toogle is selected
             */
            isSelected: async () => {
                return todoToogle.isSelected();
            },

            /**
             * Check if todo is displayed
             */
            isDisplayed: async () => {
                return await todoElem.isPresent() ? todoElem.isDisplayed() : false;         
            },

            getTextDecoration: async () => {
                return todoLabel.getCssValue("text-decoration-line");
            }


        }
    }

    // get real todos count displayed in the list
    getTodosListCount = async () => {
        return this.todosList.count();
    }

    // click clear complete button
    clearCompletedTodos = async () => {
        await this.clearCompletedButton.click();
    }

}

module.exports = new HomePage();