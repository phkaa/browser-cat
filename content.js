// 오버레이용 컨테이너 생성
const container = document.createElement('div')
container.id = 'browser-cat-container'

// 클릭 이벤트를 아래 웹페이지로 통과시키려면 pointer-events: none 지정
// (고양이만 클릭되게 하려면 Phaser 내 설정이나 별도 영역 처리가 필요합니다)
Object.assign(container.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  pointerEvents: 'none', 
  zIndex: '999999'
});

document.body.appendChild(container)

// Phaser 스크립트 모듈 동적 로드
const script = document.createElement('script')
script.src = chrome.runtime.getURL('game.js')
script.type = 'module'
document.head.appendChild(script)

script.onload = () => {
  window.postMessage({
    source: 'browser-cat',
    type: 'INIT',
    payload: {
      extensionUrl: chrome.runtime.getURL('')
    }
  }, '*')

}