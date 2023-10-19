import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

    try {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer} = await getNamedAccounts();

    const deployed = await deploy(
        "ChainIdTest",
        {
            from: deployer,
            log: true
        }
    );

    console.log("Deployed: ", deployed);

    const address: string = deployed.address;

    await hre.run("verify:verify", {
        address,
        contract: "contracts/ChainIdTest.sol:ChainIdTest"
    });

    } catch (err) {

    }
}

export default func;

func.tags = ["deploy"];
