import Header from "../components/Header/Header";

function HeaderTest() {
  return (
    <div>
      <h2>Header 테스트 페이지</h2>
      <br />
      <p>버튼 있는 페이지</p>
      <Header onCreateStudy={() => setModalOpen(true)} />
      <br />
      <p>버튼 없는 페이지</p>
      <Header showButton={false} />
    </div>
  );
}

export default HeaderTest;
