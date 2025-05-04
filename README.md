**P2PRemittance 스마트컨트랙트 개발 및 실험 기록**

---

# 1. 개발 및 실험 개요

본 프로젝트는 "P2PRemittance"라는 스마트컨트랙트를 개발하고, 이에 대해 기능적 검증 및 보안성을 실험하는 것을 목표로 한다. P2PRemittance는 중앙 기관 없이 사용자 간 직접 송금을 가능하게 하는 스마트컨트랙트로서, 본 실험은 해당 기능의 신뢰성, 정확성, 그리고 보안성(특히 재진입 공격 방어)을 검증하는 것을 주요 목적으로 한다. Solidity 기반으로 스마트컨트랙트를 작성하고, Hardhat 환경을 이용하여 로컬 블록체인 상에서 배포 및 테스트를 수행하였다.

# 2. 개발 환경

- Solidity: 0.8.28
- Hardhat: 2.23.0
- Ethers.js: 6.13.7
- OpenZeppelin Contracts: 4.9.3
- Node.js: v20.16.0
- 테스트 네트워크: Hardhat Localhost Node (127.0.0.1:8545)

# 3. 스마트컨트랙트 설계 및 기능

**주요 기능:**

- 입금 (deposit)
- P2P 송금 (transfer)
- 잔액 조회 (getBalance)
- 재진입 공격 방지 (ReentrancyGuard 적용)

**스마트컨트랙트 버전 변화:**

- 초기 버전: P2PRemittance1.jpg (ReentrancyGuard 적용 전)
- 갱신 버전: P2PRemittance2.jpg (ReentrancyGuard 적용 완료)

# 4. 실험 및 결과

## 4.1 Hardhat Node 실행 및 테스트 계정 생성

- 20개의 테스트 계정이 생성되었고, 각 계정은 10,000 ETH를 보유함.
- [generate_fake_accounts.jpg] 참고

## 4.2 스마트컨트랙트 배포

- 최초 배포: [deploy1.jpg], [deployresult1.jpg] 기록
- 보안 강화 버전 재배포: [deployresult_node2.jpg] 기록

## 4.3 수동 입금 및 송금 실험

- 입금: 1 ETH 입금 성공
- 송금: 0.5 ETH 송금 성공
- 결과 캡처: [interactresult_cmd1.jpg], [interactresult_node1.jpg]
- 보안 강화 후 동일 실험 결과: [interactresult_cmd2.jpg], [interactresult_node2.jpg]

## 4.4 자동화 테스트 코드 작성 및 검증

작성된 자동화 테스트 항목:

- 입금 및 송금 후 잔액 검증
- 잔액 초과 송금 실패 검증
- 재진입 공격 방어 기능 검증

테스트 스크립트 파일: [test1.jpg] (작성된 테스트 코드)

테스트 실행 결과:

- 모든 테스트 통과
- 결과 캡처: [test_cmd1.jpg]

# 5. 결론

본 실험을 통해 개발된 P2PRemittance 스마트컨트랙트는 기본적인 송금 기능뿐만 아니라 재진입 공격 방어 기능도 정상적으로 작동함을 확인하였다. 수동 실험과 자동화 테스트를 통해 신뢰성 있는 기능 검증이 완료되었으며, 향후 가스비 최적화, 테스트넷 상의 실거래 실험 등 보다 확장된 심화 연구를 수행할 수 있는 기반을 확보하였다.

