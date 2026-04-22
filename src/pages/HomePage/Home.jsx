import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStudies } from "../../api/studies";
import useToast from "../../hooks/useToast";
import Card from "../../components/Card/Card";
import Toast from "../../components/Toast/Toast";
import styles from "./Home.module.css";

/**
 * 스터디 목록 UI
 *
 * 페이지당 6개씩 더보기 기능 구현 - 기존 데이터들은 유지되고, 불러올 6개 데이터만 추가되는 방식으로 구현
 * 실시간 검색 기능 구현
 * 정렬 기능 구현
 */

const RECENT_STUDIES = "recent_studies";
const DAY = 1000 * 60 * 60 * 24; // 경과 일수 계산을 위한 하루 단위 ms 계산식
const LIMIT = 6; // 페이지당 출력할 스터디 수 상수처리
const SORTINGS = [
  { label: "최근 순", sortBy: "createdAt", order: "desc" },
  { label: "오래된 순", sortBy: "createdAt", order: "asc" },
  { label: "많은 포인트 순", sortBy: "points", order: "desc" },
  { label: "적은 포인트 순", sortBy: "points", order: "asc" },
];
// 추후에 목록 조회 API 포인트 동일할 경우 정렬 쿼리 보완

const Home = () => {
  const [initLoading, setInitLoading] = useState(true); // 초기 로딩
  const [moreLoading, setMoreLoading] = useState(false); // 더보기 로딩
  const [studies, setStudies] = useState([]); // 스터디 둘러보기
  const [recentStudies, setRecentStudies] = useState([]); // 최근 조회한 스터디
  const [page, setPage] = useState(1); // 첫 페이지 1
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("createdAt"); // 초기 정렬 기준 생성일시
  const [order, setOrder] = useState("desc"); // 초기 정렬 순서 내림차순
  const [usableMore, setUsableMore] = useState(false); // 더보기
  const [total, setTotal] = useState(0);
  const [shownSortingList, setShownSortingList] = useState("");
  const { toast, showToast } = useToast();

  useEffect(() => {
    setStudies([]);

    const fetchStudies = async () => {
      try {
        setInitLoading(true);

        const params = { page: 1, limit: LIMIT, sortBy, order };
        if (keyword) params.keyword = keyword;

        const res = await getStudies(params);
        const { data, total, has_more } = res.data;

        setStudies(data); // prev spread 없이 그냥 교체
        setPage(1);
        setUsableMore(has_more);
        setTotal(total);
      } catch (error) {
        console.error(`데이터 조회 실패: ${error}`);
      } finally {
        setInitLoading(false);
      }
    };

    fetchStudies();
  }, [keyword, sortBy, order]);

  useEffect(() => {
    if (page === 1) return; // 위 effect가 처리하므로 스킵

    const fetchMore = async () => {
      try {
        setMoreLoading(true);

        const params = { page, limit: LIMIT, sortBy, order };
        if (keyword) params.keyword = keyword;

        const res = await getStudies(params);
        const { data, has_more } = res.data;

        setStudies((prev) => [...prev, ...data]); // 더보기는 append
        setUsableMore(has_more);
      } catch (error) {
        console.error(`데이터 조회 실패: ${error}`);
      } finally {
        setMoreLoading(false);
      }
    };

    fetchMore();
  }, [page]);

  useEffect(() => {
    const storaged = JSON.parse(localStorage.getItem(RECENT_STUDIES) || "[]");

    setRecentStudies(storaged);
  }, []);

  const currentSort = SORTINGS.find(
    (obj) => obj.sortBy === sortBy && obj.order === order,
  )?.label;

  const handleSort = (obj) => {
    setSortBy(obj.sortBy);
    setOrder(obj.order);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setKeyword(inputValue);
  };

  return (
    <div className={styles.boxWrap}>
      <div className={styles.box}>
        <h2 className={styles.headline}>최근 조회한 스터디</h2>

        <div className={`${styles.cardList} ${styles.recent}`}>
          {recentStudies.length ? (
            recentStudies.map((study) => {
              const createdAt = new Date(study.createdAt);
              const today = new Date();
              const diffDays = Math.ceil(
                (today.getTime() - createdAt.getTime()) / DAY,
              );

              return (
                <Link key={study.id} to={`/studies/${study.id}`}>
                  <Card
                    nickname={study.nickname}
                    title={study.title}
                    description={study.description}
                    days={diffDays}
                    points={study.points ?? 0}
                    theme={study.theme}
                    emojis={study.emojis}
                  />
                </Link>
              );
            })
          ) : (
            <p className={styles.notification}>아직 조회한 스터디가 없어요</p>
          )}
        </div>
      </div>

      <div className={styles.box}>
        <h2 className={styles.headline}>스터디 둘러보기</h2>

        <div className={styles.controlBox}>
          <div className={styles.searchBox}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text"
                name="keyword"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.formInput}
                placeholder="검색"
              />
              <button type="submit" className={styles.btnSearch}>
                <span className={styles.srOnly}>검색</span>
              </button>
            </form>
          </div>

          <div className={`${styles.sortingBox} ${styles[shownSortingList]}`}>
            <button
              className={styles.currentSort}
              onClick={() =>
                setShownSortingList((prev) => (prev === "" ? "show" : ""))
              }
            >
              {currentSort}
            </button>

            <ul className={styles.sortingList}>
              {SORTINGS.map((obj) => (
                <li key={obj.label}>
                  <button
                    onClick={() => {
                      handleSort(obj);
                      setShownSortingList("");
                    }}
                  >
                    {obj.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.cardList}>
          {initLoading ? (
            <p className={styles.notification}>불러오는 중...</p>
          ) : studies.length ? (
            studies.map((study) => {
              // console.log(study);
              const createdAt = new Date(study.createdAt);
              const today = new Date();
              const diffDays = Math.ceil(
                (today.getTime() - createdAt.getTime()) / DAY,
              );

              return (
                <Link key={study.id} to={`/studies/${study.id}`}>
                  <Card
                    nickname={study.nickname}
                    title={study.title}
                    description={study.description}
                    days={diffDays}
                    points={study.points}
                    theme={study.theme}
                    emojis={study.emojis}
                  />
                </Link>
              );
            })
          ) : (
            <p className={styles.notification}>
              {keyword ? "검색된" : "아직 둘러 볼"} 스터디가 없어요
            </p>
          )}
        </div>

        <div className={styles.btnWrap}>
          {moreLoading ? (
            <p className={styles.notification}>불러오는 중...</p>
          ) : (
            <button
              onClick={() =>
                usableMore
                  ? setPage((prev) => prev + 1)
                  : showToast("warning", "더 불러올 스터디가 없어요")
              }
              className={styles.btnMore}
            >
              더보기
            </button>
          )}
        </div>

        <div className={styles.toast}>
          {toast && <Toast type={toast.type} text={toast.text} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
