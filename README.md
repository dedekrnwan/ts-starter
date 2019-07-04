Typescript -> ExpressJs Project Starter
============================

> Structure folder of Typescript -> ExpressJs Project Starter

### A typical top-level directory layout

    .
    ├── app                     # Source files (alternatively `lib` or `app`)
    ├── dist                    # Compiled files 
    ├── docs                    # Documentation files 
    ├── tests                   # Automated tests 
    ├── tools                   # Tools and utilities
    ├── vendor                  # Project file not logic
    ├── LICENSE                 
    ├── .env                    # Environments
    ├── .jest.config.js         # Jest automation tests configuration
    ├── modemon.json            # Nodemon configuration
    ├── package.json            
    ├── tsconfig.json           # Typescript configuration
    └── README.md

<!-- > Use short lowercase names at least for the top-level files and folders except
> `LICENSE`, `README.md` -->

### Application

Application or Source file of this project is in `app` and compiled to `dist`

> App folder is for logical file like `controller`, `models` or `entity`, `helper`, `middleware`,`config`, and `services` 

    .
    ├── app
    |   ├── config                  # Configuration folder ( proceed data configuration from .env )
    |       ├── **.config.ts        # Your configuration file
    |       └── index.ts            # Help you importing your config only import the folder ( `import * as config from "./../config"` )
    │   ├── controller              # Controller folder ( all controller is here )
    |       ├── **.controller.ts    # Controller file ( using `@dedekrnwan/decorators-express` modules to help you routing and call declaring middleware )
    |       └── index.ts            # Help you importing your controller only import the folder ( `import * as config from "./../controller"` )
    │   ├── helper                  # Helper folder ( all your custom function or class is here to help your development process )
    |       ├── **.helper.ts        # Your Helper file
    |       └── index.ts            # Help you importing your helper only import the folder ( `import * as config from "./../helper"` )
    │   ├── interfaces              # Interfaces folder ( interface file that you have make and you can use on another time in multiple logical function )
    |       ├── **.interface.ts     # Your Interface File
    |       └── index.ts            # Help you importing your interface only import the folder ( `import * as config from "./../interfaces"` )
    │   ├── middleware              # Middleware folder ( Middleware package or custom for express js )
    |       ├── **.middleware.ts    # Your Middleware File
    |       └── index.ts            # Sructure your middleware for position calling in `app.ts` and help you calling your middleware
    │   ├── services                # Services folder ( Service file help you to declaring third part or custom service like `Database` and etc )
    |       ├── **.service.ts       # Your Service File
    |       └── index.ts            # Help you importing your service only import the folder ( `import * as config from "./../service"` )
    │   └── utils                   # Utils ( Used for keep a project file environment like .key file )
    |       └── **.key              # .key file in this folder used for jwt secret key
    └── ...


### Lib

Lib folder used for your Express Js setup 

> Lib folder is only `app.ts` and `server.ts`

    .
    ├── lib
    |   ├── app.ts                  # Setting app your express app in this file
    |   ├── kernel.ts               # Setting app your database and middlewares here
    │   └── server.ts               # Running express app

### Public

Public folder used for your open path or static path to save your `attachment` or `assets`

> Public folder has been called before in `app.ts` for static middleware

    .
    ├── public
    |   ├── attachment              # Attachment folder 
    │   └── assets                  # Your application asstes file


### Automated tests

Automated tests are usually placed into the `tests` or, less commonly, into the `spec` or `test` folder.

> **Q: Why tests are placed into a separate folder, as opposed to having them closer to the code under testS?**
>
> **A:** Because you don't want to test the code, you want to tests the *program*.

    .
    ├── ...
    ├── tests                   # Test folder (alternatively `spec` or `test`)
    │   ├── **.test.tsx         # Unit tests
    └── ...


