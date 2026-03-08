/**
 * Firestore Data Schema Definitions
 */

export const COLLECTIONS = {
  INGREDIENTS: 'Ingredients',
  RECIPES: 'Recipes',
  SALES_ENTRIES: 'Sales_Entries',
  INVENTORY_LOGS: 'Inventory_Logs',
  EXPENSES: 'Expenses',
};

/**
 * @typedef {Object} Ingredient
 * @property {string} id
 * @property {string} name
 * @property {string} unit - 'g' or 'oz'
 * @property {number} current_stock
 * @property {number} last_unit_price
 */

/**
 * @typedef {Object} Recipe
 * @property {string} product_id - e.g., 'Original', 'Strawberry'
 * @property {string} ingredient_id
 * @property {number} amount_required
 */

/**
 * @typedef {Object} SalesEntry
 * @property {string} id
 * @property {Date} date
 * @property {string} product_type
 * @property {number} quantity
 * @property {string} channel - 'Direct', 'Retail', 'Market'
 * @property {number} unit_price
 * @property {number} commission_fee
 * @property {number} booth_fee
 * @property {string[]} participants - Array of member names/IDs
 * @property {number} net_profit - Calculated field
 */

/**
 * @typedef {Object} InventoryLog
 * @property {Date} date
 * @property {string} ingredient_id
 * @property {number} system_stock
 * @property {number} actual_stock
 * @property {number} variance
 * @property {string} reason
 */

/**
 * @typedef {Object} Expense
 * @property {string} id
 * @property {string} image_url
 * @property {Date} date
 * @property {number} amount
 * @property {string} tax_category - 'Materials', 'Supplies', 'Permits', 'Marketing'
 * @property {string} status
 */
