const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);
    const addr2 = ethers.provider.getSigner(1);
    const addr3 = ethers.provider.getSigner(2);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer, addr2, addr3 };
  }

  it('should be a winner', async function () {
    const { game, signer, addr2, addr3 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signer).buy({ value: '2' });
    await game.connect(addr2).buy({ value: '3' });
    await game.connect(addr3).buy({ value: '1' });

    // TODO: win expects three arguments
    const address_1 = await signer.getAddress();
    const address_2 = await addr2.getAddress();
    const address_3 = await addr3.getAddress();

    await game.win(address_1, address_2, address_3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
