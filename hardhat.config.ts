/**
 *
 * @author Sawyer Cutler
 * @copyright 2022 Sawyer Cutler
 * @license MIT
 *
**/

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

dotenv.config();

const PRIVATE_KEY: string | undefined = (process.env.PRIVATE_KEY as string | undefined);
if (!PRIVATE_KEY) {
    throw new Error("Private Key Not Found");
}

task("wethu-mint", "Mint wETHu")
    .setAction(async(taskArgs: any, { ethers, getNamedAccounts }) => {
        
        const contract = await ethers.getContractAt("CalypsoWETHU", "0x08f98Af60eb83C18184231591A8F89577E46A4B9");

        const res = await contract.mint("0x2c20Ef3fc0248FCA2DC57bcb202F2CAe504A9A66", ethers.utils.parseEther("0.005"));

        console.log("RES: ", res);
    })


const BASE_RPC_URL_V3: string = "https://staging-v3.skalenodes.com/v1/";
const BASE_RPC_MAINNET: string = "https://mainnet.skalenodes.com/v1/";

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    /// Required to work with hardhat deploy and the auatomation
    namedAccounts: {
        deployer: 0 
    },
    networks: {
        "calypso-staging-v3": {
            accounts: [PRIVATE_KEY],
            url: BASE_RPC_URL_V3 + 'staging-utter-unripe-menkar'
        },
        "calypso": {
            accounts: [PRIVATE_KEY],
            url: BASE_RPC_MAINNET + 'honorable-steel-rasalhague'
        },
        "chaos": {
            accounts: [PRIVATE_KEY],
            url: BASE_RPC_URL_V3 + 'staging-fast-active-bellatrix'
        },
    },
    etherscan: {
        apiKey: {
            "calypso-staging-v3": "na",
            "calypso": "non-applicable-value",
            "chaos": "na"
        },
        customChains: [
             {
                network: "chaos",
                chainId: 1351057110,
                urls: {
                    apiURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "calypso-staging-v3",
                chainId:  344106930,
                urls: {
                    apiURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/api",
                    browserURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com"
                }
            },
            {
                network: "calypso",
                chainId:  1564830818,
                urls: {
                    apiURL: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com/api",
                    browserURL: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"
                }
            }

        ]
    }
};

export default config;
