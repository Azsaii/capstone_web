import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js v3 이상에서 필요
import './Statistics.css';
import { firestore } from '../firebaseConfig';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import 'chartjs-plugin-datalabels';

const Statistics = () => {
  const navigate = useNavigate();
  const [eraData, setEraData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [total, setTotal] = useState(0);
  const [wrongProblemsCount, setWrongProblemsCount] = useState(0);

  //로그인 관리
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail'); // 로컬 스토리지에서 userEmail을 가져옴
    if (!userEmail) {
      alert('로그인 후 이용해주세요.');
      navigate('/login'); // 사용자를 로그인 페이지로 리디렉션합니다.
      return; // 리디렉션 후에는 이후 로직을 실행하지 않도록 함수를 종료합니다.
    }

    // 로그인이 확인되었을 때만 데이터를 불러오는 로직 실행
    const fetchData = async () => {
      const docRef = doc(firestore, "users", userEmail, "wrongStatistics", "data");
      const docSnap = await getDoc(docRef);
      const wrongProblemsCollectionRef = collection(firestore, "users", userEmail, "wrongProblems");
      const querySnapshot = await getDocs(wrongProblemsCollectionRef);
      if (docSnap.exists()) {
        setEraData(docSnap.data().era);
        const types = docSnap.data().type.filter((_, index) => index !== 7);
        setTypeData(types);
        setWrongProblemsCount(querySnapshot.docs.length);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [navigate]); // navigate를 의존성 배열에 추가합니다.

  useEffect(() => {
    const sum = eraData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setTotal(sum);
  }, [eraData]);

  const accuracyRate = total > 0 ? ((total - wrongProblemsCount) / total * 100).toFixed(2) : 0;




  //시대별 막대그래프
  const eradata = {
    labels: ['전삼국', '삼국', '남북국', '후삼국', '고려', '조선', '개항기', '일제강점기', '해방이후'],
    datasets: [
      {
        label: '시대별 통계',
        data: eraData, // Firestore에서 불러온 era 데이터
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          // 추가적인 색상 (생략)
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          // 추가적인 색상 (생략)
        ],
        borderWidth: 1,
      },
    ],
  };




  //시대별 원 그래프
  const eradataCiecle = {
    labels: ['전삼국', '삼국', '남북국', '후삼국', '고려', '조선', '개항기', '일제강점기', '해방이후'],
    datasets: [
      {
        label: '시대별 통계',
        data: eraData, // Firestore에서 불러온 era 데이터
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56'
        ],
        borderWidth: 1,
      },
    ],
  };

  //유형별 막대그래프
  const dataType = {
    labels: ['문화', '유물', '사건', '인물', '장소', '그림', '제도', '기구', '조약', '단체'],
    datasets: [
      {
        label: '유형별 통계',
        data: typeData, // Firestore에서 불러온, 7번 인덱스가 제외된 type 데이터
        backgroundColor: 'rgba(205, 127, 50, 0.2)', // 브론즈 색상의 RGBA 값
        borderColor: 'rgba(205, 127, 50, 1)', // 브론즈 색상의 RGBA 값
        borderWidth: 1,
      },
    ],
  };

  //유형별 원그래프
  const dataTypeCiecle = {
    labels: ['문화', '유물', '사건', '인물', '장소', '그림', '제도', '기구', '조약', '단체'],
    datasets: [
      {
        label: '유형별 통계',
        data: typeData, // Firestore에서 불러온, 7번 인덱스가 제외된 type 데이터
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // y축의 시작점을 0으로 설정
      },
    },
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // 데이터 라벨의 배경색
        borderRadius: 3,
        color: 'black', // 데이터 라벨의 글자색
        formatter: (value) => {
          return value; // 표시할 값
        },
      },
    },
  };

  let minValueIndex = eraData.length > 0 ? eraData.indexOf(Math.min(...eraData)) : -1;
  let minEraLabel = minValueIndex >= 0 ? eradata.labels[minValueIndex] : "데이터 없음";
  let minTypeIndex = typeData.length > 0 ? typeData.indexOf(Math.min(...typeData)) : -1;
  let minTypeLabel = minTypeIndex >= 0 ? dataType.labels[minTypeIndex] : "데이터 없음";

  return (
    <div>
      {/* 통계 정보 섹션 */}
      <div className="statistics-info-container">
        <h2>통계 정보</h2>
        <p>지금까지 푼 문제 수: {total}</p>
        <p>틀린 문제의 수: {wrongProblemsCount}</p>
        <p>정답율: {accuracyRate}%</p>
        <p>
          <strong style={{ fontWeight: 'bold', fontSize: '17px' }}>{minEraLabel}</strong>시대와
          <strong style={{ fontWeight: 'bold', fontSize: '17px' }}> {minTypeLabel}</strong>유형의 학습이 부족합니다.
        </p>
        <button className="statistics-button" onClick={() => alert(`${minEraLabel} 공부 페이지로 이동합니다.`)}>{`${minEraLabel} 공부하러 가기`}</button>
        <button className="statistics-button" onClick={() => alert(`${minTypeLabel} 공부 페이지로 이동합니다.`)}>{`${minTypeLabel} 공부하러 가기`}</button>

      </div>

      {/* 시대별 통계 섹션 */}
      <div className="statistics-era-section">
        <h2>시대별 통계</h2>
        <div className="statistics-chart-container">
          <div className="statistics-chart">
            <h3>시대별 막대 그래프</h3>
            <Bar data={eradata} options={options} />
          </div>
          <div className="statistics-chart">
            <h3>시대별 원 그래프</h3>
            <Doughnut data={eradataCiecle} />
          </div>
        </div>
      </div>

      {/* 유형별 통계 섹션 */}
      <div className="statistics-type-section">
        <h2>유형별 통계</h2>
        <div className="statistics-chart-container">
          <div className="statistics-chart">
            <h3>유형별 막대 그래프</h3>
            <Bar data={dataType} options={options} />
          </div>
          <div className="statistics-chart">
            <h3>유형별 원 그래프</h3>
            <Doughnut data={dataTypeCiecle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;