# Product Management Application

A comprehensive product management application built with React, TypeScript, and Tailwind CSS.

## Features

- **Product Listing**: View all products with details
- **Pagination**: Navigate through products with customizable page size
- **Sorting**: Sort products by name, price, category, stock, rating, and creation date
- **Filtering**: Filter products by name, category, price range, stock range, and rating
- **CRUD Operations**: Create, read, update, and delete products
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: Products are stored in localStorage

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)
- UUID (for generating unique IDs)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/product-management-app.git
   cd product-management-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding a Product

1. Click the "Add Product" button
2. Fill in the product details
3. Click "Add Product" to save

### Editing a Product

1. Click the edit icon next to a product
2. Modify the product details
3. Click "Update Product" to save changes

### Deleting a Product

1. Click the delete icon next to a product
2. Confirm deletion in the modal

### Filtering Products

1. Click "Show Filters" to display filtering options
2. Set your desired filters
3. Products will be filtered automatically

### Sorting Products

Click on any column header to sort by that field. Click again to toggle between ascending and descending order.

### Pagination

Use the pagination controls at the bottom to navigate between pages. You can also change the number of items displayed per page.

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.