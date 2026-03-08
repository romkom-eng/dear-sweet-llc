import React, { createContext, useState, useContext, useMemo } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // 1. Ingredients Library (Bulk Purchases)
    const [ingredients, setIngredients] = useState([
        { id: 'butter', name: 'Butter', bulkCost: 15.00, bulkWeight: 1000, unit: 'g' }, // Example: $15 per 1kg
        { id: 'kadaif', name: 'Kadaif', bulkCost: 25.00, bulkWeight: 500, unit: 'g' },
        { id: 'pistachio', name: 'Pistachio Spread', bulkCost: 40.00, bulkWeight: 1000, unit: 'g' },
        { id: 'white_choc', name: 'White Chocolate', bulkCost: 12.00, bulkWeight: 500, unit: 'g' },
        { id: 'marshmallow', name: 'Marshmallow', bulkCost: 8.00, bulkWeight: 1000, unit: 'g' },
        { id: 'cocoa', name: 'Cocoa Powder', bulkCost: 10.00, bulkWeight: 500, unit: 'g' },
        { id: 'milk_powder', name: 'Skim Milk Powder', bulkCost: 9.00, bulkWeight: 500, unit: 'g' },
        { id: 'strawberry_bulk', name: 'Strawberries (10lb)', bulkCost: 18.00, bulkWeight: 4535.92, unit: 'g' }, // 10lb = 4535.92g
    ]);

    // 2. Recipes (Bill of Materials)
    const [recipes, setRecipes] = useState([
        {
            id: 'dubai_original',
            name: 'Dubai Chewy (Original)',
            batchSize: 12,
            items: [
                { ingredientId: 'butter', amount: 85 },
                { ingredientId: 'kadaif', amount: 200 },
                { ingredientId: 'pistachio', amount: 180 },
                { ingredientId: 'white_choc', amount: 60 },
                { ingredientId: 'marshmallow', amount: 250 },
                { ingredientId: 'cocoa', amount: 20 },
                { ingredientId: 'milk_powder', amount: 10 },
            ]
        },
        {
            id: 'dubai_strawberry',
            name: 'Dubai Chewy (Strawberry)',
            batchSize: 12,
            items: [
                { ingredientId: 'butter', amount: 85 },
                { ingredientId: 'kadaif', amount: 200 },
                { ingredientId: 'pistachio', amount: 180 },
                { ingredientId: 'white_choc', amount: 60 },
                { ingredientId: 'marshmallow', amount: 250 },
                { ingredientId: 'cocoa', amount: 20 },
                { ingredientId: 'milk_powder', amount: 10 },
                { ingredientId: 'strawberry_bulk', amount: 300 }, // Assuming 300g of strawberries per batch
            ]
        }
    ]);

    // 3. Overhead & Depreciation
    const [overheads, setOverheads] = useState([
        { id: '1', name: 'Oven Pan', cost: 10.00, type: 'Fixed Asset' },
        { id: '2', name: 'Plastic Gloves (600 pcs)', cost: 9.00, type: 'Consumable (Cost per unit: $0.015)' },
        { id: '3', name: 'Scale', cost: 7.00, type: 'Fixed Asset' },
        { id: '4', name: 'Teflon Sheet (3 pcs)', cost: 8.00, type: 'Reusable Asset' },
    ]);

    // Calculate real product costs dynamically
    const computedProductCosts = useMemo(() => {
        const costs = {};
        recipes.forEach(recipe => {
            let totalBatchCost = 0;
            recipe.items.forEach(item => {
                const ingredient = ingredients.find(ing => ing.id === item.ingredientId);
                if (ingredient) {
                    const costPerGram = ingredient.bulkCost / ingredient.bulkWeight;
                    totalBatchCost += costPerGram * item.amount;
                }
            });
            // Also accounting for average glove usage (e.g. 2 gloves per batch) = $0.03
            const fixedBatchOverhead = 0.03;
            costs[recipe.name] = (totalBatchCost + fixedBatchOverhead) / recipe.batchSize;
        });
        return costs;
    }, [ingredients, recipes]);

    // Initial global state
    const [salesHistory, setSalesHistory] = useState([]);
    const [expenseHistory, setExpenseHistory] = useState([]);
    const [inventory, setInventory] = useState([
        { id: 'butter', name: 'Butter', stock: 0, unit: 'g', price: 0.015, color: 'rose', status: 'Depleted' },
        { id: 'kadaif', name: 'Kadaif', stock: 300, unit: 'g', price: 0.05, color: 'amber', status: 'Low' },
        { id: 'pistachio', name: 'Pistachio Spread', stock: 500, unit: 'g', price: 0.04, color: 'amber', status: 'Stable' },
        { id: 'white_choc', name: 'White Chocolate', stock: 50, unit: 'g', price: 0.024, color: 'rose', status: 'Critical' },
        { id: 'marshmallow', name: 'Marshmallow', stock: 0, unit: 'g', price: 0.008, color: 'rose', status: 'Depleted' },
        { id: 'cocoa', name: 'Cocoa Powder', stock: 100, unit: 'g', price: 0.02, color: 'amber', status: 'Critical' },
        { id: 'milk_powder', name: 'Skim Milk Powder', stock: 200, unit: 'g', price: 0.018, color: 'amber', status: 'Low' },
        { id: 'strawberry_bulk', name: 'Strawberries', stock: 0, unit: 'g', price: 0.004, color: 'rose', status: 'Depleted' },
    ]);
    const [balance, setBalance] = useState(0);

    // Derived statistics reset to 0
    const [stats, setStats] = useState({
        monthlyRevenue: 0,
        netProfit: 0,
        totalSales: 0,
        lowStockItems: 5 // Initial calculated value
    });

    // Chart Data initialized to 0
    const [chartDataState, setChartDataState] = useState([0, 0, 0, 0, 0, 0, 0]);

    // Action: Register a new sale
    const addSale = (saleData) => {
        setSalesHistory(prev => [saleData, ...prev]);

        const gross = saleData.quantity * saleData.unit_price;
        const net = saleData.netProfit;

        setStats(prev => ({
            ...prev,
            monthlyRevenue: prev.monthlyRevenue + gross,
            netProfit: prev.netProfit + net,
            totalSales: prev.totalSales + saleData.quantity
        }));

        setBalance(prev => prev + net);

        setChartDataState(prev => {
            const newData = [...prev.slice(1), prev[prev.length - 1] + net];
            return newData;
        });

        // Dynamic inventory deduction based on recipes
        const recipeName = saleData.product_type === 'Original' ? 'Dubai Chewy (Original)' : 'Dubai Chewy (Strawberry)';
        const recipe = recipes.find(r => r.name === recipeName);

        if (recipe) {
            setInventory(prevInventory => {
                let newInventory = [...prevInventory];

                // Deduct proportional ingredient amounts
                recipe.items.forEach(item => {
                    const amountNeeded = (item.amount / recipe.batchSize) * saleData.quantity;

                    newInventory = newInventory.map(invItem => {
                        if (invItem.id === item.ingredientId) {
                            const newStock = Math.max(0, invItem.stock - amountNeeded);
                            let newStatus = 'Stable';
                            let newColor = 'emerald';
                            if (newStock === 0) { newStatus = 'Depleted'; newColor = 'rose'; }
                            else if (newStock < 200) { newStatus = 'Critical'; newColor = 'rose'; }
                            else if (newStock < 500) { newStatus = 'Low'; newColor = 'amber'; }

                            return { ...invItem, stock: newStock, status: newStatus, color: newColor };
                        }
                        return invItem;
                    });
                });

                // Update low stock count
                const lowCount = newInventory.filter(i => i.status === 'Critical' || i.status === 'Depleted' || i.status === 'Low').length;
                setStats(s => ({ ...s, lowStockItems: lowCount }));

                return newInventory;
            });
        }
    };

    // Action: Register an expense
    const addExpense = (expenseData) => {
        setExpenseHistory(prev => [expenseData, ...prev]);

        setStats(prev => ({
            ...prev,
            netProfit: prev.netProfit - expenseData.amount
        }));
        setBalance(prev => prev - expenseData.amount);

        setChartDataState(prev => {
            const newData = [...prev.slice(1), prev[prev.length - 1] - expenseData.amount];
            return newData;
        });
    };

    return (
        <DataContext.Provider value={{
            salesHistory,
            expenseHistory,
            inventory,
            stats,
            balance,
            chartDataState,
            computedProductCosts,
            ingredients,
            recipes,
            overheads,
            addSale,
            addExpense
        }}>
            {children}
        </DataContext.Provider>
    );
};
