const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let toDoList = [];

function showMenu() {
    console.log(`
        To-Do List Menu:
        1. View To-Do List
        2. Add To-Do Item
        3. Remove To-Do Item
        4. Exit
    `);
    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                viewToDoList();
                break;
            case '2':
                addToDoItem();
                break;
            case '3':
                removeToDoItem();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                showMenu();
                break;
        }
    });
}

function viewToDoList() {
    if (toDoList.length === 0) {
        console.log('Your to-do list is empty.');
    } else {
        console.log('To-Do List:');
        toDoList.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
    showMenu();
}

function addToDoItem() {
    rl.question('Enter a new to-do item: ', (item) => {
        toDoList.push(item);
        console.log(`"${item}" has been added to your to-do list.`);
        showMenu();
    });
}

function removeToDoItem() {
    rl.question('Enter the number of the item to remove: ', (number) => {
        const index = parseInt(number) - 1;
        if (index >= 0 && index < toDoList.length) {
            const removedItem = toDoList.splice(index, 1);
            console.log(`"${removedItem}" has been removed from your to-do list.`);
        } else {
            console.log('Invalid item number. Please try again.');
        }
        showMenu();
    });
}

// Start the app by showing the menu
showMenu();
