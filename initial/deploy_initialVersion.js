const { ethers } = require("hardhat");

async function main() {
  // 스마트컨트랙트 가져오기
  const P2PRemittance = await ethers.getContractFactory("P2PRemittance");

  // 배포 (deployed() 따로 필요 없이 바로)
  const p2pRemittance = await P2PRemittance.deploy();

  console.log(`P2PRemittance deployed to: ${p2pRemittance.target}`);
}

// 오류 캐치
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });