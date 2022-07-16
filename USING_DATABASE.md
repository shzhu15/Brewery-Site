# Using the database with our server
## Adapted from guide on tripco
# 1 Establish connection
* Create ssh connection to CS machines
```bash
ssh -L 56247:faure.cs.colostate.edu:3306 <eid>@<cs-machine>
```
replace with your eid and desired cs machine
# 2 Set up local server
* download mysql
```baah
sudo apt-get install mysql-server
```
* dont worry about being able to access mysql locally 
(it might ask you to set up a local password, we don't need one since we're pretending to be on the CSU machine)
* Check that mysql is working properly 
```bash
mysql -u cs314-db -h 127.0.0.1 -P 56247 -p 
password: eiK5liet1uej
```
(this should get you to a mysql shell)
* use the following commands in the shell to make sure it is connected to the CS database
```bash
use cs314;
```
(moves you to the colorado table)
```bash
select * from colorado limit 5;
```
(shows the first five elements in the colorado table)
# 3 Set up development mode
* add the following to your ~/.bashrc file
```bash
export CS314_ENV=development
```
* remember to call 'source ~/.bashrc' afterwards
# 4 Run the web server
* you can see what it is doing by using a find request in your RESTClient (an example of one can be found in TIP.md)
* Keep the ssh connection from step one open or the database won't work
