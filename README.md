# Todo App Take-Home Assignment

## Overview

Your task is to create a simple todo app that implements the functionality listed below.

The base project has already been created for you with the stack mentioned below. 

You will be adding several features on top of the base project.

You do not need to implement all the features listed below. You can choose to implement as many as you like. The more features you implement, the better.

You will be judged on code quality, file structure, readability, and best practices.

Each feature will be worth between 5 and 15 points, depending on the complexity of the feature.
The higher the complexity, the more points you will receive.

You can earn a total of 92.5 points.

Unless stated otherwise, you may not use any external libraries or packages.

All your queries about the technical aspects of the assignment are answered in this file. Kindly read it thoroughly before getting started.

### Stack

* The backend is using Node.js with Next.js
* The frontend is using React.js
* The language is ES6 JavaScript
* The database is SQLite with Sequelize ORM
* Styling is done using basic CSS with CSS modules
* You can use moment.js for date formatting, and it is already installed in the project

### Features

| Feature                                                                                                                                                                              	| Points 	| Compulsory 	|
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|--------	|------------	|
| Add ability to star / unstar a todo item                                                                                                                                             	| 5      	| No         	|
| Add an activity log that displays any changes made to any todo item                                                                                                                  	| 15     	| No         	|
| Add a date picker to the todo item form that allows the user to set a due date for the todo item. You are to use the date time picker that is built into the browser                 	| 5      	| Yes        	|
| Add an input field to the todo item form that allows the user to set a due date using natural language like "tomorrow at 5pm" or "next week". You may use a library for this feature 	| 10     	| No         	|
| Add the ability to search for todo items by title. Searching should be done on the server side, no library can be used, and search should work with pagination                       	| 7.5    	| No         	|
| Add the ability to sort todo items by title and due date. Sorting should be done on the server side, no library can be used, and sorting should work with pagination                 	| 7.5    	| No         	|
| Add a button to duplicate a todo item                                                                                                                                                	| 5      	| No         	|
| Highlight overdue todo items in red                                                                                                                                                  	| 5      	| Yes        	|
| Add the ability to edit a todo item. Editing needs to be inline and not in a separate form or page                                                                                   	| 7.5    	| Yes        	|
| Add pagination to the todo list. Searching and sorting should work with pagination, and pagination should be done only on the server side                                            	| 10     	| No         	|
| Design - Make the app responsive                                                                                                                                                     	| 10     	| Yes        	|
| Design - Match the Figma design perfectly                                                                                                                                            	| 5      	| Yes        	|

### Implementation

You will need to use certain CSS ids on certain elements in order to pass our automated tests. Any submissions that do not pass our automated tests will not be considered.
Anywhere you see ${todo_id}, replace it with the id of the todo item the element belongs to. Please make sure you use IDs and not classes for the elements.

Each todo element should be wrapped inside a div with the id `todo-${todo_id}`.

#### Star / Unstar

A single button should be added to each todo item that allows the user to star / unstar the todo item.
The button that can be clicked to star / unstar a todo item must have the id `todo-star-button__${todo_id}`.
A starred item should have bold text. There should be a data attribute data-starred on the button that is set to true if the todo item is starred and false if it is not starred.

#### Date Picker

A date picker should be added to the new todo item form that allows the user to set a due date for the todo item.
The date picker must be a native HTML date picker, and must have the id `new-todo-due-date-picker`.

If you add a date picker that is not a native HTML date picker, you will not receive any points for this feature.

#### Natural Language Date Picker

A text field should be added to the new todo item form that allows the user to set a due date for the todo item using natural language.
The text field must have the id `new-todo-due-date-text-field`. If you are implementing the natural language date picker, you must not implement the date picker from the previous feature.

#### Search

A search bar should be added to the todo list that allows the user to search for todo items by title.
The search bar must have the id `todo-search-bar`.

#### Sort

A dropdown should be added to the todo list that allows the user to sort todo items by title and due date.
The dropdown must have the id `todo-sort-dropdown`.

Please use the browser native dropdown for this feature.

The dropdown should have the following options:
-  Sort by created date (descending) - This is the default option
 - Sort by title (ascending)
 - Sort by title (descending)
 - Sort by due date (ascending)
 - Sort by due date (descending)

The options should have the following ids:
 - `todo-sort-dropdown__title-ascending`
 - `todo-sort-dropdown__title-descending`
 - `todo-sort-dropdown__due-date-ascending`
 - `todo-sort-dropdown__due-date-descending`
 - `todo-sort-dropdown__created-date-descending`

The default sort should be by created date (descending).
 
#### Duplicate

A button should be added to each todo item that allows the user to duplicate the todo item.
The button that can be clicked to duplicate a todo item must have the id `todo-duplicate-button__${todo_id}`.

#### Highlight Overdue

An overdue item is a todo item that has a due date that is before the current date and time. 
Overdue todo items should be highlighted in red. 
Add a data attribute to each todo item that is overdue with data-overdue="true".


#### Edit

Clicking the title of a todo item should allow the user to edit the title of the todo item. 
The title of the todo item should be replaced with a text field that allows the user to edit the title of the todo item.
The todo item should expand to show an option to update the due date as well.
The text field that allows the user to edit the title of the todo item must have the id `todo-edit-title-text-field__${todo_id}`.

There can be an option to edit the due date of the todo item as well, but this is not compulsory.
If you do add the option to edit the due date of the todo item, the date picker that allows the user to edit the due date of the todo item must have the id `todo-edit-due-date-picker__${todo_id}`.
If you do add the option to edit the due date of the todo item using natural language, the text field that allows the user to edit the due date of the todo item must have the id `todo-edit-due-date-text-field__${todo_id}`.

#### Pagination

Each page of the todo list should display 10 todo items. 
The todo list should be paginated, and the user should be able to navigate between pages.
The server should only return 10 todo items at a time, and the server should only return the todo items that are on the current page.
The pagination buttons should be added to the bottom of the todo list, and the number of pages should be displayed.

Items must be sorted in descending order by creation date by default unless user chooses another sort option. There should be a button for each page. The button for the current page should be disabled.

The pagination buttons must have the following ids:
 - `todo-pagination-button__previous`
 - `todo-pagination-button__next`
 - `todo-pagination-button__page_${page_number}`


#### Activity Log

An activity log should be added to the todo list that displays any changes made to any todo item. 
You must create a separate table in the database to store the activity log, and the activity log should be displayed in chronological order from newest to oldest.
The activity log must be added to a separate page at `/todos/activity-log`.

Each activity log entry should display the following information:
 - The current title of the todo item
 - The date and time the change was made
 - The type of change that was made
 - The old value of the change
 - The new value of the change

The activity log must have the following ids:

- `activity-log-list-item_${todo_id}`
- `activity-log-list-item__title_${todo_id}`
- `activity-log-list-item__date-time_${todo_id}`
- `activity-log-list-item__change-type_${todo_id}`
- `activity-log-list-item__old-value_${todo_id}`
- `activity-log-list-item__new-value_${todo_id}`

The element with the `activity-log-list-item_${todo_id}` should have a data attribute data-datetime that contains the date and time the change was made which you can get with `.toISOString()` function on a date object.


#### Miscellaneous

- The todo item will have two rows if it has a due date set and a single row if it does not have a due date set.
- The title should always be editable on the todo item. Once you click on the title or start editing it, the todo item should expand to show a due date input and a save button.


---

## Process

- Start by cloning the repository
- Inside the repository, you will find a `todo-app` folder. This is the folder you will be working in. Do not modify any other files outside this folder.
- You will need to install the npm packages by running `npm install` in the `todo-app` folder.
- The dev server can be started by running `npm run dev` in the `todo-app` folder. This will start the dev server on port 3000.
- The dev server will automatically restart when you make changes to the code.
- Once you have the dev server running, you can access the todo app at http://localhost:3000/todos.

Once you have completed the above steps, you can start working on the features. 
The included code includes certain bare minimum features that will give you a basic idea of how to get started.

Anytime you add columns to the database, you will need to visit http://localhost:3000/api/db-sync to apply the changes to the database.


## Design

The design is provided in the following Figma link:

https://www.figma.com/file/WvqR3gdpjk7Dn4V6RJMmo3/To-Do-List?node-id=0%3A1

## Submission

To submit your work, you will need to create a zip file of the `todo-app` folder and upload it to the submission form at the link mentioned below.

Before you create the zip file, update the SUBMITTER.txt file with your email address. 
The email address should be on the first line of the file, and there should be no other text in the file.

The create the zip file, you can run the following command in the `todo-app` folder:

```
npm run zip
```

This will create a zip file called `todo-app-submission.zip` in the folder that this README file is located.

Once you have the zip file, please fill the google form at the following link. 

https://forms.gle/TA5fbH6GmHQwS95T7

Please be sure to mention the email that you received the assignment on. 
Upload the zip file that was generated on the google form. 

Best of luck!
