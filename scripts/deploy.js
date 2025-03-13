async function main() {
    // Get the contract factory
    const Tracking = await ethers.getContractFactory("Tracking");
  
    // Deploy the contract
    const tracking = await Tracking.deploy();
  
    // Wait for the deployment to be mined
    await tracking.deployed();
  
    console.log("MyContract deployed to:",tracking.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });