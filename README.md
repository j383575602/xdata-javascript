
# Homepage:
 
 XData is a simple serialize framework based on binary data, it is swift, small, safe and stable. Enable you to transfer data among java, javascript, ios and flutter.
 You can edit your contract classes and learn more on the page: [http://www.xcore.top](http://www.xcore.top), and all api calls of this website are using XData as the sample.
 So, if you are using ,or considering using JSON ,XML, or ProtocolBuffer, We recommend you have a try on XData as an alternative.

# xdata-java
This is the xdata repo for javascript platform. If you want to download all platforms,there they are:

-  xdata-all: a repo managed all platforms by google repo tool.

    git@github.com:j383575602/xdata-all.git

-  xdata-java : java platform

    git@github.com:j383575602/xdata-java.git

-  xdata-objective-c : objective-c platform

    git@github.com:j383575602/xdata-objective-c.git

- xdata-javascript : javascript platform

    git@github.com:j383575602/xdata-javascript.git

-  xdata-dart : dart platform

    git@github.com:j383575602/xdata-dart.git


#Demo
    Assume there are two classes defined with XData protocol.  User, Car

    let car1 = new XCarWrapper();
    car1.brand = "Audi";

    let car2 = new XCarWrapper();
    car2.brand = "Porsche";

    let cars = new Array<>();
    cars.add(car1);
    carr.add(car2);


    let user = new XUserWrapper();
    user.name = "John Smith";
    user.age = 35;
    user.cars = cars;


    //start to serialize
    let writer = new XDataWriter();
    let bytes = writer.writeData(user);


    //start to deserialize
    let parser = new XDataParser();

    let data = parser.parse(bytes);

    let user2 = new XUserWrapper(data);
    
    //start to check 
    assert(user2.name == "John Smith"));
    assert(user2.age  == 35);
    assert(user2.cars.length == 2);
    assert(user2.cars[0].brand == "Audi");
    assert(user2.cars[1].brand == "Porsche");


#Supprted Types


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
   
   
 
 
