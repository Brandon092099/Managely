from flask import Flask
from flask import request
import pymysql
import json

#app = Flask(__name__)

#Members API Route

#test members route that works with react
# @app.route("/members")
# def members():
#     output = Select()
#     return {"members": output}




from flask import jsonify


app = Flask(__name__)



@app.route('/api/data', methods=['GET'])
def get_data():
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    with conn.cursor() as cursor:
        cursor.execute('SELECT * FROM employeeinfo')
        data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def create_row():
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    new_row = request.json
    with conn.cursor() as cursor:
        cursor.execute('INSERT INTO employeeinfo (ID, fName, lName, gender, dateOfBirth, termInfo, salary) VALUES (%s, %s, %s, %s, %s, %s, %s)', (new_row['ID'], new_row['fName'], new_row['lName'], new_row['gender'], new_row['dateOfBirth'], new_row['termInfo'], new_row['salary']))
        conn.commit()
        cursor.execute('SELECT * FROM employeeinfo WHERE ID = %s', (cursor.lastrowid,))
        data = cursor.fetchone()
    return jsonify(data)

@app.route('/api/data/<int:ID>', methods=['PUT'])
def update_row(ID):
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    updated_row = request.json
    with conn.cursor() as cursor:
        cursor.execute('UPDATE employeeinfo SET fName = %s, lName = %s, gender = %s, dateOfBirth = %s, termInfo = %s, salary = %s WHERE ID = %s', (updated_row['fName'], updated_row['lName'], updated_row['gender'], updated_row['dateOfBirth'], updated_row['termInfo'], updated_row['salary'], ID))
        conn.commit()
        cursor.execute('SELECT * FROM employeeinfo WHERE ID = %s', (ID,))
        data = cursor.fetchone()
    return jsonify(data)

@app.route('/api/data/<int:ID>', methods=['DELETE'])
def delete_row(ID):
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    with conn.cursor() as cursor:
        cursor.execute('DELETE FROM employeeinfo WHERE ID = %s', (ID,))
        conn.commit()
    return 'Success'




@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute('SELECT * FROM inventory')
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

@app.route('/api/inventory', methods=['POST'])
def add_inventory():
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    typeID = request.json['typeID']
    invenID = request.json['invenID']
    name = request.json['name']
    brand = request.json['brand']
    price = request.json['price']
    amount = request.json['amount']
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute('INSERT INTO inventory (typeID, invenID, name, brand, price, amount) VALUES (%s, %s, %s, %s, %s, %s)', (typeID, invenID, name, brand, price, amount))
    conn.commit()
    conn.close()
    return jsonify('Inventory added successfully')

@app.route('/api/inventory/<invenID>', methods=['PUT'])
def update_inventory(invenID):
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    typeID = request.json['typeID']
    invenID = request.json['invenID']
    name = request.json['name']
    brand = request.json['brand']
    price = request.json['price']
    amount = request.json['amount']
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute('UPDATE inventory SET typeID = %s, invenID= %s, name = %s, brand = %s, price = %s, amount = %s WHERE invenID = %s', (typeID, invenID, name, brand, price, amount, invenID))
    conn.commit()
    conn.close()
    return jsonify('Inventory updated successfully')

@app.route('/api/inventory/<invenID>', methods=['DELETE'])
def delete_inventory(invenID):
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute('DELETE FROM inventory WHERE invenID = %s', (invenID,))
    conn.commit()
    conn.close()
    return jsonify('Inventory deleted successfully')







@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    conn = pymysql.connect(
    host='localhost',
        user='root',
        password="",
        db='Managely',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute(
        "SELECT * FROM `login details` WHERE email=%s AND password=%s",
        (email, password)
    )
    user = cursor.fetchone()
    if user:
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(
            "SELECT * FROM `login details` WHERE email=%s AND password=%s AND id IN (SELECT aID FROM employeeinfoadmin);",
            (email, password)
        )
        user = cursor.fetchall()
        if (user):
            response = {'success': True, 'admin': True}
        else:
            response = {'success': True, 'admin': False} 
            
    else:
        response = {'success': False}
    conn.close()
    return jsonify(response)



#Select inventory function with formatting for example output
@app.route("/SelectInventory")
def Select():
    # To connect MySQL database
    conn = pymysql.connect(
        host='localhost',
        user='root',
        password="",
        db='Managely',
    )

    cur = conn.cursor()

    # Commit Changes
    conn.commit()

    # Select query
    cur.execute("SELECT * FROM `Inventory` WHERE typeID = 5")
    output = cur.fetchall()
    newOutput = output[0]
 #For the value i in our output = select statement print it out to console for now
    # If react references data then, it's a matter of figuring out on how to pull said data

    print(list(newOutput))
    # To close the connection
    conn.close()

    return (list(newOutput))







#code to check if user or admin
#example on how we can check for user input

#create array (which is our json file datavalues)

#test = ["Admin","random@managely.com",
#        "New user", "Default@gmail.com"]

#check which types are users are in here

#print(test)

#This part was completed in login instructions but is being mocked for testing purposes.
#Enter user Id
#enter password

#check if valid

#if so begin login process

#if not return

#check exception



#There is two way to approach this
#since we got the login to complete successfully, we now want to check which page they will be redirected to.
#Option 1: If The user enters the information correctly, we can look what data is stored on that index and save the
#email locally to determine choice
#print("This is an admin")
    #redirect to admin version of webpage

    #leave root access alone for admin as they should have root access

#elif "@managely.com" not in email and "default" not in email:
    #print("this is an employee, with no default login details")

    #Redirect to user version of UI (which is just the same as the Admin but without employee details

    #since we are going to a new UI page we want to set certain restrictions so that the user cannot see all details in
    #our database

    #BY root

    #OR by just deleting other options aka, they will just have inventory access only.


#THIS IS OPTIONAL
#elif "@managely.com" not in email and "default" in email:
    #print("This is not an admin, so employee, but does not have a good login so redirect to username and email updated")

    #redirect to update page

    #once done, to employee UI with privlages update or webpage with no options



#Original Inventory Select function without new formatting.

# def Select():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Managely',
#     )

#     cur = conn.cursor()

#     # Commit Changes
#     conn.commit()

#     # Select query
#     cur.execute("SELECT * FROM `Inventory` ")
#     output = cur.fetchall()


#  #For the value i in our output = select statement print it out to console for now
#     # If react references data then, it's a matter of figuring out on how to pull said data
#     for i in output:
#         print(i)

#     # To close the connection
#     conn.close()

    








# # Admin Add function

# def mysqlconnect():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Managely',
#     )

#     cur = conn.cursor()
#     # Pull Data from React command TBD

#     # local values that can be replaced from the text values
#     # Since we are the admin who will be entering the data, they should be the only ones who will have access to edit this for now
#     ID= '12425'
#     SSN = '122914372'
#     fName = "Po"
#     lName = "J"
#     gender = "M"
#     #For date its yyyy-mm-dd
#     DOB = '1976-10-01'
#     termInfo = "Q3"
#     job = "Engineer"
#     salary = '50000'
#     description = "This can be anything"
#     InvID = '0'
#     time = '01:00:00'
#     date = '2021-02-12'
#     username = "Default"
#     password = "nice"
#     email = "default@gmail.com"
#     #Exception checking




#     # Insert Data
#     # Create insert example (Will create pull information from text boxes further down the road
#     # can create local values to store information from text boxes
#     # makes it possible to do insert checks before they go through and relay information

#     insert = "INSERT INTO `EmployeeInfoAdmin`(`aID`, `SSN`, `aFName`, `aLName`, `agender`, `aDateOfBirth`, `aTermInfo`) VALUES (%s,%s,%s,%s,%s,%s,%s)"


#     #2nd insert statement for EmpInfo
#     insert2 = "INSERT INTO `EmployeeInfo`(`ID`, `fName`, `lName`, `gender`, `dateOfBirth`, `termInfo`, `salary`) VALUES (%s,%s,%s,%s,%s,%s,%s)"
#     #3rd insert statement for Positions
#     insert3 = "INSERT INTO `Positions`(`employeeID`,`invenTypeID`, `job`, `salary`, `description`) VALUES (%s,%s,%s,%s,%s)"
#     #4th insert statement for Schedule ** INVESTGATING HOW **
#     insert4 = "INSERT INTO `Schedule`(`sID`, `sFName`, `sLName`,`date`,`dateTime`) VALUES (%s,%s,%s,%s,%s)"
#     #5th insert for login which will have default values for now
#     insert5 = "INSERT INTO `Login details`(`ID`, `username`, `password`, `email`) VALUES (%s,%s,%s,%s)"

#     # we want a try and catch block to prevent repeated primary keys
#     try:
#         # execute statement
#         cur.execute(insert,(ID,SSN,fName,lName,gender,DOB,termInfo))
#     except:
#         print("Error")

#     try:
#         # execute statement
#         cur.execute(insert2, (ID,fName,lName,gender,DOB,termInfo,salary))
#     except:
#         print("Error2")

#     try:
#         # execute statement
#         cur.execute(insert3, (ID,InvID,job,salary,description))
#     except:
#         print("Error3")

#     try:
#         # execute statement
#         cur.execute(insert4, (ID,fName,lName,date,time))
#     except:
#         print("Error4")

#     try:
#         # execute statement
#         cur.execute(insert5, (ID,username,password,email))
#     except:
#         print("Error5")

#     # Commit Changes
#     conn.commit()











# # Delete reference function


# def mysqlconnect():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Mangely',
#     )

#     cur = conn.cursor()

# # Insert Data
#     # Create insert example (Will create pull information from text boxes further down the road
#     #can create local values to store information from text boxes
#     #need to fix Price to ensure that it is also considered for validation
#     insert = "DELETE FROM `Inventory` WHERE `Brand`= 'John' && `Quantity` = '10' && 'Price'= 59.99 ;"
#     cur.execute(insert)


#     # Commit Changes
#     conn.commit()










# #Edit Reference function

# def mysqlconnect():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Mangely',
#     )

#     cur = conn.cursor()

# # Insert Data
#     # Create insert example (Will create pull infromation from text boxes further down the road
#     #can create local values to store information from text boxes
#     #makes it possible to do insert checks before they go through and relay information
#     Edit = "UPDATE `Inventory` SET `Brand`='Bra',`Quantity`='34', `Price`= '89.99' WHERE `Brand` = 'Brandon' && `Quantity` = '34' &&  `Price` = '79.99'"
#     cur.execute(Edit)


#     # Commit Changes
#     conn.commit()










# # Exception Handling Example

# Test = ''

# #Check for empty
# if Test =='':
#     print("Error Invalid input")
#     #check for integer
# elif Test.isnumeric():
#     print("Error its a integer")
#     #check for whitespaces (For login)
# elif ' ' in Test:
#     print("Sorry no whitespaces allowed")
# else:
#     print("Passed")










# Exception Examples

# #loop value
#     check  = 0
#     #Exception Handling if wanted to be done in the backend

#     #check typeID
#     while check == 0:
#         if typeID == '':
#             print("Error Invalid input")
#             # check for whitespaces
#         elif ' ' in typeID:
#             print("Sorry no whitespaces allowed")

#             #check for length
#         elif  len(typeID) > 20:
#             print("Error invalid size")

#             # check for integer (if int exit while else invalid)
#         elif typeID.isnumeric():
#             check = 1
#         else:
#             print("Sorry Invalid integer")

#         # reset check value
#         check = 0
#         #invenID check
#         while check == 0:

#             if invenID == '':
#                 print("Error Invalid input")

#                 # check for whitespaces
#             elif ' ' in invenID:
#                 print("Sorry no whitespaces allowed")

#                 # check for length
#             elif len(invenID) > 20:
#                 print("Error invalid size")

#                 # check for integer
#             elif invenID.isnumeric():
#                 check = 1
#             else:
#                 print("Sorry invalid integer")

#             # reset check value
#         check = 0

#         #name check
#         while check == 0:

#             if name == '':
#                 print("Error invalid input")

#                 # check for integer
#             elif invenID.isnumeric():
#                 print("invalid name ")
#             else:
#                 check = 1

#                 # reset check value
#                 check = 0
#                 # brand check
#         while check == 0:

#                     if brand == '':
#                         print("Error invalid input")

#                         # check for integer
#                     elif brand.isnumeric():
#                         print("invalid brand ")
#                     else:
#                         check = 1

#         # reset check value
#         check = 0

#         # price check
#         while check == 0:

#             if price == '':
#                 print("Error Invalid input")

#                 # check for whitespaces
#             elif ' ' in price:
#                 print("Sorry no whitespaces allowed")

#                 # check for length
#             elif len(price) > 10:
#                 print("Error invalid size")

#                 # check for integer
#             elif price.isnumeric():
#                 continue
#             else:
#                 print("Sorry invalid integer")



#                 # reset check value
#                 check = 0
#                 # invenID check
#                 while check == 0:

#                     if amount == '':
#                         print("Error Invalid input")

#                         # check for whitespaces
#                     elif ' ' in amount:
#                         print("Sorry no whitespaces allowed")

#                         # check for length
#                     elif len(amount) > 11:
#                         print("Error invalid size")

#                         # check for integer
#                     elif amount.isnumeric():
#                         continue
#                     else:
#                         print("Sorry invalid integer")










# Insert Reference

# def mysqlconnect():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Managely',
#     )

#     cur = conn.cursor()
# #Pull Data from React command TBD

# #Test local values
#     Test1 = "BOB"
#     Test2 = '12'
#     Test3 = '29.99'

#     #Exception Handling
#     if Test1 == '':
#         print("Error Invalid input")
#         # check for integer
#     elif Test1.isnumeric():
#         print("Error its a integer")
#         # check for whitespaces (For login)
#     elif ' ' in Test1:
#         print("Sorry no whitespaces allowed")

#         # Exception Handling 2
#         if Test2 == '':
#             print("Error Invalid input")
#             # check for whitespaces
#         elif ' ' in Test2:
#             print("Sorry no whitespaces allowed")

#             # Exception Handling 3
#         if Test3 == '':
#             print("Error Invalid input")
#         elif Test3.isalpha():
#             print("Sorry invalid entry")
#         elif ' ' in Test3:
#             print("Sorry no whitespaces allowed")
#         else:
#             print("Passed")




# # Insert Data
#     # Create insert example (Will create pull information from text boxes further down the road
#     #can create local values to store information from text boxes
#     #makes it possible to do insert checks before they go through and relay information
#     insert = "INSERT INTO `Inventory` (`Brand`, `Quantity`, `Price`) VALUES ( %s, %s , %s );"
#     cur.execute(insert,(Test1,Test2,Test3))


#     # Commit Changes
#     conn.commit()










# # Inventory Add

# def mysqlconnect():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Managely',
#     )

#     cur = conn.cursor()
# #Pull Data from React command TBD

# # local values
#     typeID = '3'
#     invenID = '00312'
#     name = "nep"
#     brand = "idk"
#     price = '29.99'
#     amount = '7'

#     # Insert Data
#     # Create insert example (Will create pull information from text boxes further down the road
#     #can create local values to store information from text boxes
#     #makes it possible to do insert checks before they go through and relay information


#     insert = "INSERT INTO `Inventory`(`typeID`, `invenID`, `name`, `brand`, `price`, `amount`) VALUES (%s,%s,%s,%s,%s,%s)"

#     #we want a try and catch block to prevent repeated primary keys
#     try:
#         # execute statement
#         cur.execute(insert, (typeID, invenID, name, brand, price, amount))
#     except:
#         print("Error")
#         print("Check primary keys values for testing ")
#     # Commit Changes
#     conn.commit()










# Select employees information

# def Select():
#     # To connect MySQL database
#     conn = pymysql.connect(
#         host='localhost',
#         user='root',
#         password="",
#         db='Managely',
#     )

#     cur = conn.cursor()

#     # Commit Changes
#     conn.commit()

#     # Select query
#     cur.execute("SELECT * FROM `EmployeeInfoAdmin` ")
#     output = cur.fetchall()



#     # To close the connection
#     conn.close()









# Driver Code
if __name__ == "__main__":
    app.run(debug=True)