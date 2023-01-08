This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The version of node used in this project is node 16.13.2. You can find the versions at: https://nodejs.org/en/ or install using sudo apt-get install node==16.13.2. Make sure you have python3 installed to run the server for the api requests. You can install python at: https://www.python.org/downloads/ or at sudo apt install python3. Once both of those libraries have been installed it is important to pull the github repo. Then change into the root directory and run npm i to install the necessary node modules. Then run the first command below if you installed node.

```bash
npm run dev
# or
yarn dev
```
 Then cd into ml-server and in another terminal run the virtual environment venv using source venv/bin/activate. Then run python3 app.py to start the python server. Then access port:3000 or whatever the local host is and you should be able to run the app.
