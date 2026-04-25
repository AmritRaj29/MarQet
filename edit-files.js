const fs = require('fs');

function replaceInFile(filePath, oldStr, newStr) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(oldStr)) {
    fs.writeFileSync(filePath, content.replace(oldStr, newStr), 'utf8');
    console.log('UPDATED: ' + filePath);
  } else {
    console.log('NO MATCH: ' + filePath);
  }
}

replaceInFile(
  'postman/collections/MarQet API/Products/Get Product By ID.request.yaml',
  'pm.expect(json).to.have.property("price");\n      });',
  'pm.expect(json).to.have.property("price");\n        pm.collectionVariables.set("productId", json._id);\n      });'
);

const tokenFiles = [
  'postman/collections/MarQet API/Shops/Create Shop.request.yaml',
  'postman/collections/MarQet API/Shops/Update Shop.request.yaml',
  'postman/collections/MarQet API/Shops/Get My Shop.request.yaml',
  'postman/collections/MarQet API/Orders/Get Shop Orders.request.yaml',
  'postman/collections/MarQet API/Orders/Update Order Status.request.yaml',
];
for (const f of tokenFiles) {
  replaceInFile(f, "value: '{{token}}'", "value: '{{shopkeeperToken}}'");
}
