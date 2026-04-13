const styles = `
.ic { 
    display: block;
    position: relative;
}
.ic:not(:first-child) {
    margin-top: 15px;
}
.ic::after {
    content: attr(data-title);
    position: absolute;
    top: 50%;
    left: calc(100% + 20px);
    white-space: nowrap;
    translate: 0 -50%;
}
`;

const IconTest = () => {
  return (
    <div>
      <style>{styles}</style>

      <div
        style={{
          padding: 20,
          backgroundColor: `var(--green)`,
        }}
      >
        <div data-title="angle-right" className="ic angle-right"></div>
        <div data-title="caret-down" className="ic caret-down"></div>
        <div data-title="close" className="ic close"></div>
        <div data-title="plus" className="ic plus"></div>
        <div data-title="hidden" className="ic hidden"></div>
        <div data-title="visible" className="ic visible"></div>
        <div data-title="leaf" className="ic leaf"></div>
        <div data-title="pause" className="ic pause"></div>
        <div data-title="play" className="ic play"></div>
        <div data-title="restart" className="ic restart"></div>
        <div data-title="stop" className="ic stop"></div>
        <div data-title="smile" className="ic smile"></div>
        <div data-title="search" className="ic search"></div>
        <div data-title="paw" className="ic paw"></div>
        <div data-title="trash" className="ic trash"></div>
      </div>

      <p style={{ lineHeight: 1.3 }}>
        아이콘의 기본 크기는 부모 요소에 font-size 가 정의되어 있다면 정의된
        font-size 를 따라갈 수 있게 em 처리를 해두었고, <br />
        아이콘마다 기본적으로 갖는 고유의 크기&#40;24px, 35px, 44px...&#41;가
        있기는 하나, <br />각 파트별로 맡은 페이지 내에서 각자 크기를 잡아보는
        것&#40;반응형 처리 포함&#41;이 어떨까 싶어서 크기는 따로 공통으로 빼지
        않았습니다. <br />
        <br />
        가져다 쓸 때에는 ic &#40;필수&#41; 와 위에 명시된 네이밍을 클래스명으로
        불러온다. ex&#41; className="ic paw"
      </p>
    </div>
  );
};

export default IconTest;
