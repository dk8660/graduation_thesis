// scripts/interact.js

const { ethers } = require("hardhat");

async function main() {
  const [sender, receiver] = await ethers.getSigners();

  // 이미 배포된 P2PRemittance 컨트랙트 주소 (배포할 때 출력된 주소 사용)
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const P2PRemittance = await ethers.getContractAt("P2PRemittance", contractAddress);

  // 1. sender가 입금
  const depositTx = await P2PRemittance.connect(sender).deposit({ value: ethers.parseEther("1.0") });
  await depositTx.wait();
  console.log("Deposited 1.0 ETH from sender");

  // 2. sender 잔액 확인
  const senderBalance = await P2PRemittance.getBalance(sender.address);
  console.log(`Sender Balance: ${ethers.formatEther(senderBalance)} ETH`);

  // 3. 송금 (sender → receiver)
  const transferTx = await P2PRemittance.connect(sender).transfer(receiver.address, ethers.parseEther("0.5"));
  await transferTx.wait();
  console.log("Transferred 0.5 ETH from sender to receiver");

  // 4. sender, receiver 잔액 확인
  const senderBalanceAfter = await P2PRemittance.getBalance(sender.address);
  const receiverBalance = await P2PRemittance.getBalance(receiver.address);
  console.log(`Sender Balance After: ${ethers.formatEther(senderBalanceAfter)} ETH`);
  console.log(`Receiver Balance: ${ethers.formatEther(receiverBalance)} ETH`);
}

// 오류 캐치
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  