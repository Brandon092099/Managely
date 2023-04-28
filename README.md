# Managely

Managely is a small business management software that allows for tracking of employees and inventory. It is designed for small businesses with low budgets who need a simple employee/inventory tracking software.



Installation Instructions:

1. Install Python, NodeJS, and XAMPP on your device. Links: https://www.python.org/downloads/ , https://nodejs.org/en/download , https://www.apachefriends.org/download.html
2. To load up PHPMYADMIN, run XAMPP as administrator and begin both Mysql and Apache. You can now load PHPMYADMIN by clicking the "admin" button beside Mysql.
3. Create a database in PHPMYADMIN called "Managely". Find the document titled "Managely-2.sql" in Documentation folder and run it in the SQL section on PHPMYADMIN. This is the test/default data.
4. Move into "flask-server" folder in terminal and run "python -m venv venv".
5. In the same terminal, run ".\venv\Scripts\activate".
6. In the same terminal, run "python server.py". This begins running the backend at localhost: 5000.
7. Move into "client" folder in terminal and run "npm start". This begins running the frontend at localhost: 3000.
8. Load both of these localhost locations in your broswer to see the backend data and the frontend site.
9. Login with the following to view the Admin (Employer) view: email: default@gmail.com ; password: nice
10. Login with the following to view the Employee view: email: defaultEmployee@gmail.com ; password: nice

Note: If you have any issues running this, please reach out to bsgeorge@uncg.edu (Brandon George).
