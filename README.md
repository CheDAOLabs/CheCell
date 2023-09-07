## What is CheCell?

CheCell is an evolutionary onchain game featuring living cells that players can customize,evolve,adn breed.

 

## Dependencies
-layabox
https://www.layaair.com/#/engineDownload

-dojo 
https://github.com/dojoengine/dojo

## Tutorial && Documents
todo

## IF YOU CAN NOT BUILD THE DEPENDENCIES THEN PLEASE RUN THE CMDS BELOW TO SET UP THE ENVIRONMENT:
# contract:
- Install [Rust](https://www.rust-lang.org/tools/install)
- Setup Rust:
```bash
rustup override set stable && rustup update
```
- Install Cairo
- Verify Cairo:
```bash
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
```
Verify installation by running the following command in new terminal session, it should print both Scarb and Cairo language versions, e.g:
```bash
$ scarb --version
  scarb 0.6.0 (532d8e349 2023-08-07)
  cairo: 2.1.0 (https://crates.io/crates/cairo-lang-compiler/2.1.0)
```
- Install Dojo
- Update Dojo:
```bash
curl -L https://install.dojoengine.org | bash
```
This will install Dojoup, then simply follow the instructions on-screen, which will make the dojoup command available in your CLI.
```bash
dojoup
```
# client
Please refer to this link： https://www.layaair.com/#/doc

## Build and Run
# contract

Enter the contract folder and run:
```bash
katana --block-time 1000
 ```
Then open a new bash:
```bash
sudo sozo build
```
build is used to compile the cairo contracts, generating the necessary artifacts for deployment.
```bash
./run_script.sh
```
This script is used to deploy contracts to local katana and open contract permissions for interaction

### some warning
The world address may change, you need to modify the configuration in the script e.g:
- sozo auth writer Account InitAccount --world 0x162c09952c4e7235fd05497168b8113851e8942177c8bc60fc1cbaff423c338 #here

After the bash finish,you can connect the local katana and play the game.
# client
- Select the client folder in the project
- Click Import Project to import 3.x projects created on other computers or projects removed from the list to the project list. The operation is as shown in the figure.
![image](https://github.com/CheDAOLabs/CheCell/assets/7781044/fa93795e-463e-4283-8e91-5de35d1889bd)

- click the 1 scene
- click the 2 button and the game will run in the local web
 ![微信图片_20230907204850](https://github.com/CheDAOLabs/CheCell/assets/7781044/dbb7d6fb-8b14-4f8f-8301-0dae2aa64bd2)

### some tips
-The world address you can find in client/src/net/common/SetupNetwork.ts 
```
export const WORLD_ADDRESS = "0x162c09952c4e7235fd05497168b8113851e8942177c8bc60fc1cbaff423c338"
```
- There are two way to synchronous data in client/src/net/core/syncworker/index.ts
```
init()
initGQL()
```
- the first one is a temporary and inefficient method of synchronizing data, it will get all the events on the current chain and update them to the latest data one by one
- the second method requires you to start a torri for the client to synchronize data, which is an officially recommended method
- enter the contract folder and run:
```
torii --world 0x162c09952c4e7235fd05497168b8113851e8942177c8bc60fc1cbaff423c338
```
