const fs = require('fs');
const path = 'postman/collections/MarQet API/Products/Get Product By ID.request.yaml';
let c = fs.readFileSync(path, 'utf8');
const oldStr = '    pm.expect(json).to.have.property("price");\r\n      });';
const newStr = '    pm.expect(json).to.have.property("price");\r\n        pm.collectionVariables.set("productId", json._id);\r\n      });';
if (c.includes(oldStr)) {
  fs.writeFileSync(path, c.replace(oldStr, newStr), 'utf8');
  console.log('UPDATED product');
} else {
  // try without CRLF
  const o2 = '    pm.expect(json).to.have.property("price");\n      });';
  const n2 = '    pm.expect(json).to.have.property("price");\n        pm.collectionVariables.set("productId", json._id);\n      });';
  if (c.includes(o2)) {
    fs.writeFileSync(path, c.replace(o2, n2), 'utf8');
    console.log('UPDATED product LF');
  } else {
    console.log('NO MATCH');
    console.log(JSON.stringify(c));
  }
}
