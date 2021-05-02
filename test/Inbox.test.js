
//assert is used for making assertions/comparison about tests
const assert = require('assert');
const ganache = require('ganache-cli');
//whenever we are making use of web3, we are going to be requesting or requiring a constructor. Reason why Web3 is capitalized
const Web3 = require('web3');
//creates an instance of web3 and enables the instance to attempt to connect with our local testnet 
//our provider is our communication layer that allows us connect with a local network
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts, inbox = null;
const INITIAL_STRING = 'Hi, there';

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({data: bytecode, arguments: [INITIAL_STRING]})
                .send({from: accounts[0], gas: '1000000'});

    inbox.setProvider(provider);
});

describe('Inbox', ()=>{
    it('Deploys a contract', () => {
        //we want to verify if our contract has been deployed on an address
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message =  await inbox.methods.message().call();
        assert.strictEqual(message, INITIAL_STRING)
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage("bye").send({from: accounts[0]});
        const message =  await inbox.methods.message().call();
        assert.strictEqual(message, 'bye');       
    })
})

/** 
class Car {
    park() {
        return "stopped";
    }
    drive() {
        return "vroom";
    }
}

let car = null;

//any logic placed here will be executed before each it statement
beforeEach(() => {
    car = new Car();
});

describe('Car class', ()=>{
    it('can park', ()=> {
        assert.strictEqual(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.strictEqual(car.drive(), 'vroom');
    })
})

*/