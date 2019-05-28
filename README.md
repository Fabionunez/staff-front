


![Staff](https://staff-ironhack.herokuapp.com/static/media/logo.8fdaa260.svg)



## Description

Film Trails allows to find spots by location where movies or tv shows were filmed. The user can also upload spots to the site.

Staff is a toolkit for the human resource managers, that help them to have all the info of their employees organized.


## User Stories

-  **404:** As a user I want to know if a page that I tried to access exist.
-  **Signup:** As a human resource manager you can create an admin account.
-  **Login:** As a human resource manager or as an emloyee you can enter in the private area.
-  **Logout:** As an user you can close my session.
-  **Add employee** As an human resource manager you can add a new employee to my company.
-  **Delete employee** As an human resource manager you can remove an employee from my company.
-  **Update employee** As a human resource manager you can update the information of the employees, their access account and their photos.
-  **Search employee** As a user you can search by keyword any employee.
-  **View employee** As an employee you can view the profesional information of your colleges.
-  **Add a team** As a human resource manager you can create teams, select the team leader and select the members of the team.
-  **Remove a team** As a human resource manager you can delete teams.
-  **Update company** As a human resource manager you can update the team information.


## Backlog

- Stats section
- Use populate in all models
- Transform into component the add and edit employee form.

  
# Client

## Routes
| Method | Path | Component | Permissions | Behavior | 
|--------|------|--------|--| -------|
| `get` | `/` | Login | public | login form, link to signup, redirect to /employees after login |
| `get` | `/signup` | Signup| public| link to login, redirect to /employees after signup |
| `get` | `/logout` | n/a| public | redirect to login |
| `get` | `/employees` | Employees| user | shows list of employees and allow search |
| `get` | `/employee/add` | EmployeesAdd| admin | allow the admin add new employees and upload a photo |
| `get` | `/employee/edit/:id` | EmployeesEdit| user or admin | show the admin a update form |
| `get` | `/employee/view/:id` | EmployeesView| user | show the user a profile view |
| `get` | `/company` | Company| admin | show the admin an update employee form |
| `get` | `/teams` | Teams| admin | show a list of all teams with the thumbnails of a few employees of each team |
| `get` | `/teams/add` | TeamAdd| admin | Allow the admin to create new teams, and asign a team leader and some members |
| `get` | `/teams/edit/:id` | TeamEdit| admin | allow the admin update a team |
| `get` | `/stats` | Stats| admin | just a landing by the moment 
| `get` | `**` | Page404 | public | 


## Components

- Navbar
  - NavBarMenu

- Topbar

- Login

- Signup

- Company

- Employees

- EmployeesAdd

- EmployeesEdit

- EmployeesView

- Stats

- Teams
  - TeamTable
    - TeamItem

- TeamAdd
  - SeletEmployeeTable
    - SelectEmployeeItem

- TeamEdit
  - SeletEmployeeTable
    - SelectEmployeeItem

- Page404



## Services


- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Company Service
  - companyUpdate(user)
  - companyView(id)

- Employee Service
  - employeesList()
  - employeeAdd(user)
  - employeeView(id)
  - employeeUpdate(user)
  - employeeDelete(id)
  - imageUpload(file)

- Team Service
  - teamList()
  - teamAdd(team)
  - teamView(id)
  - teamUpdate(user)
  - teamDelete(id)

# Server

## Models

User model
```
username - String
password - String
name - String
surname - String
title - String
companyPhone - String
dateStart - String
birthDate - String
gender - String
nationality - String
phone - String
photo - String
identificationNumber - String
socialSecurityNumber - String
address - String
city - String
postalCode - String
province - String
country - String
emergencyContact - String
emergencyPhone - String
managerID - String
companyID - String
isAdmin - Boolean
imageUrl - String
```

Company model
```
name - String
usersIds - [{ type: Schema.Types.ObjectId, ref:"User"}]
teamLeaderid - String
companyId - String
mission - String
vision - String

```



## API Endpoints (backend routes)


- POST /auth/signup
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user not exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object

- POST /auth/login
  - 401 if user logged in
  - body:
    - username
    - password
  - validation
    - fields not empty (422)
    - user exists (404)
    - password matches (404)
  - store user in session
  - 200 with user object

- POST /auth/logout
  - body: (empty)
  - 204

- GET /location/:id
  - 200 with locationObject of a spot
  - validation  
    - id is valid (404)
    - id exists (404)

- POST /location/add
  - body:
    - title
    - lat
    - lon
    - scenePictureUrl
  - validation
    - fields not empty
  - create location
  - 200 with locationObject

- POST /location/update/:id
  - body:
    - title
    - lat
    - lon
    - scenePictureUrl
  - validation
    - fields not empty
    - id is valid (404)
    - id exists (404)
  - update location
  - 200 with locationObject

- DELETE /location/delete/:id
  - validation
    - id is valid (404)
    - id exists (404)
  - remove location
  
- POST /search/?coords&dist
  - validation
    - fields not empty
  - 200 with array of LocationObject


## Links

### Trello/Kanban

[Trello board](https://trello.com/b/BLn0CsCx/staff)

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Fabionunez/staff-front)
[Server repository Link](https://github.com/Fabionunez/staff-back)

[Deploy Link](https://staff-ironhack.herokuapp.com)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1Iy5UzkjVc-4k4QRMX7yQ6QJFifXiKckxPhjhqowOQtI/edit?usp=sharing)