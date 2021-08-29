# 1. intsall 
```
npm install xcore-xdata
    
```

# 2. import 

```
   import {XData,XDataWriter,XDataParser} from 'xcore-xdata'

```
   
# 3. Serialize to byte array:

 1  visit https://xcore.top to design a model .for example An **UserModel(username,password).** 
 
 2  download the source code and put in your source dir. you will get the source file UserModelWrapper.js

```
   let user = new UserWrapper();
   user.name = "Jim Green"
   user.password = "111111"
   let writer = new XDataWriter();
   let bytes = writer.write(user);
   
```

**bytes** is an arraybuffer, you can send it to anywhere you like.

# 4. Deserialize 

serialize the **bytes** (you can get from a **XData** stream) back to userwraper model:

```
    let parser = new XDataParser();
    let xdata = parser.parse(bytes);
    let user = new UserWrapper(xdata);
    console.log(user.name) // will print Jim Green
    console.log(user.password) // will print 111111

```

# 5. Support data types

  |order|datatype |  single |List      | Set   | StringMap|IntMap | LongMap | FloatMap |DoubleMap |
  |-----|-----|---------| ---------|--------|----------|-------|---------|----------|----------|
  |1|int8|number|List\<number>| Set\<number> |Map<String,number>|Map<number,number>| Map<number,number>|Map<number,number>|Map<number,number>|
  |2|int16|number|List\<number>| Set\<number> |Map<String,number>|Map<number,number>| Map<number,number>|Map<number,number>|Map<number,number>|
  |3|int32|number|List\<number>|Set\<number>|Map<String,number>|Map<number,number>| Map<number,number>|Map<number,number>|Map<number,number>|
  |4|int64|number|List\<number>|Set\<number>|Map<String,number>|Map<number,number>| Map<number,number>|Map<number,number>|Map<number,number>|
  |5|float32|number|List\<number>|Set\<number>|Map<String,number>|Map<number,number>| Map<number,number>|Map<number,number>|Map<number,number>|
  |6|float64|number|List\<number>|Set\<number>|Map<String,number>|Map<number,number>| Map<number,number>|Map<number,number>|Map<number,number>|
  |7|boolean|boolean|List\<boolean>|Set\<boolean>|Map<String,boolean>|Map<number,boolean>| Map<number,boolean>|Map<number,boolean>|Map<number,boolean>
  |8|String|String|List\<String>|Set\<String>|Map<String,String>|Map<number,String>| Map<number,String>|Map<number,String>|Map<number,String>|
  |9|Date|Date|List\<Date>|Set\<Date>|Map<String,Date>|Map<number,Date>| Map<number,Date>|Map<number,Date>|Map<number,Date>|
  |10|ArrayBuffer|ArrayBuffer|List\<ArrayBuffer>|Set\<ArrayBuffer>|Map<String,ArrayBuffer>|Map<number,ArrayBuffer>| Map<number,ArrayBuffer>|Map<number,ArrayBuffer>|Map<number,ArrayBuffer>|
  |11|XData|XData|List\<XData>|Set\<XData>|Map<String,XData>|Map<number,XData>| Map<number,XData>|Map<number,XData>|Map<number,XData>|
  
  


