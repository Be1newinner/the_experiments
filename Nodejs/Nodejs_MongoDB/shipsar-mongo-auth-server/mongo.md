Mongo Tutorial
show Databsees => show dbs
select Databases => use 'database_name'
Create Collection => 1. db.createCollection("collection_name") 2. db.posts.insertOne({object})
Insert Single Documents => db.posts.insertOne({object})
Insert Multiple Documents => db.posts.insertMany([{object},{object},{object},{object}])
Find Multiple Data => db.posts.find()
Find Single Data => db.posts.findOne()

Querying Data => db.posts.findOne({ itemKey : "itemValue" })
projection Only One key (i.e. which data to fetch \_id will always return) => db.posts.find({}, {itemKey: 1 | 0})

Update One Data => db.posts.updateOne({title: "some"}, {$set : { likes:2 } })
Update One Data & insert if not exist => db.posts.updateOne({title: "some"}, {$set : { likes:2 } }, { upsert: true })

Update Many Data ( $inc operator ) => db.posts.updateMany({title: "some"}, {$inc : { likes:1 } })
Delete One Data => db.posts.deleteOne({ title: "post" })
Delete One Data => db.posts.deleteMany({ title: "post" })

Comparison Operators => The following operators can be used in queries to compare values:

    $eq: Values are equal
    $ne: Values are not equal
    $gt: Value is greater than another value
    $gte: Value is greater than or equal to another value
    $lt: Value is less than another value
    $lte: Value is less than or equal to another value
    $in: Value is matched within an array

Logical Operators => The following operators can logically compare multiple queries.

    $and: Returns documents where both queries match
    $or: Returns documents where either query matches
    $nor: Returns documents where both queries fail to match
    $not: Returns documents where the query does not match

Evaluation Operators => The following operators assist in evaluating documents.

    $regex: Allows the use of regular expressions when evaluating field values
    $text: Performs a text search
    $where: Uses a JavaScript expression to match documents

<strong>MongoDB Update Operators</strong>

There are many update operators that can be used during document updates.

Fields => The following operators can be used to update fields:

    $currentDate: Sets the field value to the current date
    $inc: Increments the field value
    $rename: Renames the field
    $set: Sets the value of a field
    $unset: Removes the field from the document

Array => The following operators assist with updating arrays.

    $addToSet: Adds distinct elements to an array
    $pop: Removes the first or last element of an array
    $pull: Removes all elements from an array that match the query
    $push: Adds an element to an array


Some More