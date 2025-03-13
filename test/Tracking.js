const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Tracking", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTrackingFixture() {
    // Define initial values and other setup parameters for your Tracking contract
    const initialData = "Initial Tracking Data"; // Adjust according to your contract
    const ONE_GWEI = 1_000_000_000;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Tracking = await ethers.getContractFactory("Tracking");
    const tracking = await Tracking.deploy(initialData, { value: ONE_GWEI });

    return { tracking, initialData, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right initial values", async function () {
      const { tracking, initialData } = await loadFixture(deployTrackingFixture);

      expect(await tracking.initialData()).to.equal(initialData);
    });

    it("Should set the right owner", async function () {
      const { tracking, owner } = await loadFixture(deployTrackingFixture);

      expect(await tracking.owner()).to.equal(owner.address);
    });
  });

  describe("SomeFunctionality", function () {
    it("Should do something", async function () {
      const { tracking, owner, otherAccount } = await loadFixture(deployTrackingFixture);
      // Example functionality test, adjust according to your contract's methods
      await tracking.someFunction();
      expect(await tracking.someStateVariable()).to.equal(someExpectedValue);
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { tracking } = await loadFixture(deployTrackingFixture);

        await expect(tracking.withdraw()).to.be.revertedWith("You can't withdraw yet");
      });

      it("Should revert with the right error if called from another account", async function () {
        const { tracking, otherAccount } = await loadFixture(deployTrackingFixture);

        // We can increase the time in Hardhat Network
        await time.increaseTo(someFutureTime);

        // We use tracking.connect() to send a transaction from another account
        await expect(tracking.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
      });

      it("Shouldn't fail if the right conditions are met", async function () {
        const { tracking } = await loadFixture(deployTrackingFixture);

        // Transactions are sent using the first signer by default
        await time.increaseTo(someFutureTime);

        await expect(tracking.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { tracking, initialData } = await loadFixture(deployTrackingFixture);

        await time.increaseTo(someFutureTime);

        await expect(tracking.withdraw()).to.emit(tracking, "Withdrawal").withArgs(anyValue, anyValue); // Adjust args as needed
      });
    });

    describe("Transfers", function () {
      it("Should transfer the funds to the owner", async function () {
        const { tracking, owner } = await loadFixture(deployTrackingFixture);

        await time.increaseTo(someFutureTime);

        await expect(tracking.withdraw()).to.changeEtherBalances([owner, tracking], [1_000_000_000, -1_000_000_000]);
      });
    });
  });
});
