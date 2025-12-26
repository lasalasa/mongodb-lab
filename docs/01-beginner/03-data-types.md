# MongoDB Data Types (BSON)

MongoDB stores data in **BSON** (Binary JSON). Here is how BSON types map to your language.

| Type | Node.js | Python (PyMongo) | C# (.NET Driver) |
| :--- | :--- | :--- | :--- |
| **String** | `String` | `str` | `string` / `BsonString` |
| **Integer** | `Number` | `int` | `int` / `BsonInt32` |
| **Double** | `Number` | `float` | `double` / `BsonDouble` |
| **Boolean** | `Boolean` | `bool` | `bool` / `BsonBoolean` |
| **Array** | `Array` `[]` | `list` `[]`| `BsonArray` / `List<T>` |
| **Object** | `Object` `{}` | `dict` `{}` | `BsonDocument` |
| **Null** | `null` | `None` | `null` / `BsonNull` |
| **Date** | `Date` | `datetime.datetime` | `DateTime` |
| **ObjectId** | `ObjectId` | `bson.ObjectId` | `ObjectId` |

## Important Considerations

### ObjectId
The unique identifier.

**Node.js**
```javascript
const { ObjectId } = require("mongodb");
const id = new ObjectId("507f1f77bcf86cd799439011");
```

**Python**
```python
from bson import ObjectId
id = ObjectId("507f1f77bcf86cd799439011")
```

**C#**
```csharp
var id = new ObjectId("507f1f77bcf86cd799439011");
```

### Date
Always use native Date objects.

**Node.js**
```javascript
{ createdAt: new Date() }
```

**Python**
```python
import datetime
{ "createdAt": datetime.datetime.utcnow() }
```

**C#**
```csharp
new BsonDocument { { "createdAt", DateTime.UtcNow } }
```
