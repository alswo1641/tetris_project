# Tetris Game

이 프로젝트는 HTML5의 `<canvas>`를 사용하여 테트리스 게임을 구현한 것입니다. 아래는 프로젝트의 개발 과정과 기능 설명입니다.

## 화면 구성 (2일)

게임은 크게 세 가지의 캔버스를 사용합니다:

- **게임 화면**: 주된 테트리스 게임 보드를 그립니다.
- **다음 블럭 미리보기**: 다음에 나올 블럭을 미리 볼 수 있습니다.
- **점수판**: 현재 점수를 표시합니다.

## 게임 로직 (3일)

- **테트로미노 생성**: 랜덤으로 테트로미노(블럭)를 생성하여 보드에 놓습니다.
- **회전 기능**: 테트로미노는 회전할 수 있으며, 회전 시 보드의 다른 블록과 충돌하지 않도록 체크합니다.
- **하강**: 테트로미노는 일정 시간마다 자동으로 하강합니다.
- **라인 제거**: 한 줄이 채워지면 그 라인을 제거하고 점수를 증가시킵니다.

## 서버 호스팅 (1일)

서버는 간단하게 Firebase를 통해 호스팅을했습니다.
tetris-project-99a63.web.app

## 문서 정리 (1일)

게임 로직 및 프로젝트 설정에 대한 문서를 정리했습니다.
