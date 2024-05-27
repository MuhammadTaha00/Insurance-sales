# Insurance Sales Management Application

This project is a simple sales management application built with React. The application allows users to manage sales records, including adding, editing, and deleting sales entries. It also features a sales chart visualization using Recharts. The application is mobile responsive and implemented with user accessibility principles to ensure it is easily readable by assistive technology.

## Features

 * Sales List: View a list of all sales records.
 * Add Sale: Add a new sale record.
 * Edit Sale: Edit an existing sale record.
 * Delete Sale: Delete a sale record.
 * Sales Chart: A PieChart that displays totaly number of sales by product/device.
 * Mobile Responsive: Optimized for mobile devices.
 * Accessible: Designed with accessibility principals.

## How to run?

In the project directory, you can run:

### `yarn install`

Installs the project dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## How to test?

### `yarn test`

Launches the test runner in the interactive watch mode.

## How to create a production build?

### `yarn run build`

Builds the app for production to the `build` folder.


## Components

### SalesForm
The SalesForm component allows users to add and edit sales records. It includes fields for first name, last name, email, age, and product selection.

### SalesList
The SalesList component displays a table of all sales records. Each row has options to edit or delete the corresponding sale record.

### SalesChart
The SalesChart component uses Recharts to visualize sales data in a chart format.

## Hooks

### useSales
The useSales hook manages the state for sales records and products. It includes functions to add, update, and delete sales records.


## Mobile Responsiveness and Accessibility

This application is designed to be mobile responsive, ensuring a smooth experience on both desktop and mobile devices. Additionally, it follows accessibility principles to make it easily readable by screen readers, providing a better user experience for all users, including those with disabilities.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
