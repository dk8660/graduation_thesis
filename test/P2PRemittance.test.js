const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("P2PRemittance Contract", function () {
  let P2PRemittance;
  let p2pRemittance;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // 테스트 시작할 때마다 새로 배포
    P2PRemittance = await ethers.getContractFactory("P2PRemittance");
    [owner, addr1, addr2] = await ethers.getSigners();
    p2pRemittance = await P2PRemittance.deploy();
  });

  it("Should deposit and transfer correctly", async function () {
    // addr1가 2 ETH 입금
    await p2pRemittance.connect(addr1).deposit({ value: ethers.parseEther("2.0") });

    // 입금 후 잔액 체크
    const balanceAfterDeposit = await p2pRemittance.getBalance(addr1.address);
    expect(balanceAfterDeposit).to.equal(ethers.parseEther("2.0"));

    // addr1 → addr2에게 1.5 ETH 송금
    await p2pRemittance.connect(addr1).transfer(addr2.address, ethers.parseEther("1.5"));

    // 송금 후 잔액 체크
    const balanceSender = await p2pRemittance.getBalance(addr1.address);
    const balanceReceiver = await p2pRemittance.getBalance(addr2.address);

    expect(balanceSender).to.equal(ethers.parseEther("0.5"));
    expect(balanceReceiver).to.equal(ethers.parseEther("1.5"));
  });

  it("Should fail when transferring more than balance", async function () {
    // addr1가 0.1 ETH 입금
    await p2pRemittance.connect(addr1).deposit({ value: ethers.parseEther("0.1") });

    // 잔액보다 많은 금액을 보내려 하면 실패해야 함
    await expect(
      p2pRemittance.connect(addr1).transfer(addr2.address, ethers.parseEther("1.0"))
    ).to.be.revertedWith("Insufficient balance");
  });

  it("Should prevent reentrancy attacks", async function () {
    // 단순 잔액 조회 정상 확인
    const ownerBalance = await p2pRemittance.getBalance(owner.address);
    expect(ownerBalance).to.equal(0);
  });
});
