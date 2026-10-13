const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 },
];

const budgetThreshold = 50;
const premiumThreshold = 500;
let productName;

console.log("--- Initializing Inventory System ---");

while (true) {
  const input = prompt("Enter the new product name (or cancel to skip):");
  if (input === null) {
    console.log("Product entry cancelled.");
    break;
  }

  productName = input.trim();
  if (!productName) {
    console.log("Product name cannot be empty. Please try again.");
    continue;
  }

  let duplicate = false;
  for (const product of inventory) {
    if (product.name.toLowerCase() === productName.toLowerCase()) {
      duplicate = true;
      break;
    }
  }

  if (duplicate) {
    console.log("That product already exists. Enter a different name.");
    continue;
  }
  break;
}

if (productName) {
  let productPrice;

  while (true) {
    const input = prompt(`Enter the price for ${productName}:`);
    if (input === null) {
      console.log("Product entry cancelled.");
      break;
    }

    const parsedPrice = Number(input);
    if (input.trim() !== "" && Number.isFinite(parsedPrice) && parsedPrice > 0) {
      productPrice = parsedPrice;
      break;
    }

    console.log("Enter a valid price greater than zero.");
  }

  if (productPrice !== undefined) {
    inventory.push({ name: productName, price: productPrice });
    console.log(`[Prompt executed: User adds "${productName}" at "$${productPrice}"]`);
  }
}

for (const product of inventory) {
  if (!Number.isFinite(product.price) || product.price <= 0) {
    console.log(`Skipping invalid product: ${product.name}`);
    continue;
  }

  let category;
  if (product.price < budgetThreshold) {
    category = "budget";
  } else if (product.price >= premiumThreshold) {
    category = "premium";
  } else {
    category = "standard";
  }

  switch (category) {
    case "premium":
      product.badge = "Premium";
      break;
    case "budget":
      product.badge = "Budget";
      break;
    case "standard":
      product.badge = "Standard";
      break;
    default:
      product.badge = "Uncategorized";
  }
}

function getInventoryStats(items) {
  let totalValue = 0;
  let validCount = 0;

  for (const item of items) {
    if (!Number.isFinite(item.price) || item.price <= 0) {
      continue;
    }
    totalValue += item.price;
    validCount++;
  }

  return {
    count: validCount,
    totalValue,
    averagePrice: validCount === 0 ? 0 : totalValue / validCount,
  };
}

const calculateFinalTotal = (subtotal, taxRate = 0, discountRate = 0) => {
  const discountedSubtotal = subtotal * (1 - discountRate);
  let total = discountedSubtotal;
  total += discountedSubtotal * taxRate;
  return total;
};

const stats = getInventoryStats(inventory);
const affordableProducts = inventory.filter(
  (product) => Number.isFinite(product.price) && product.price < 200,
);
const productSummary = inventory.map(
  (product) => `${product.name.toUpperCase()}: $${product.price}`,
);

console.log("--- Processing Inventory Roster (forEach) ---");
inventory.forEach((product) => {
  console.log(`* Item: ${product.name} ($${product.price}) -> Category: ${product.badge}`);
});

const totalInventoryValue = calculateFinalTotal(stats.totalValue, 0, 0);
console.log("--- Financial Analytics ---");
console.log(`Total Inventory Value: $${totalInventoryValue}`);
console.log(`Filtered Affordable Items (Under $200): ${JSON.stringify(affordableProducts.map((product) => product.name))}`);
console.log(`Formatted Report List: ${JSON.stringify(productSummary)}`);
