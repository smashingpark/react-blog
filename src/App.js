import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [subject, setSubject] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
  let [date, setDate] = useState(['2023. 6. 19', '2023. 3. 4', '2023. 1. 1'])
  let [like, setLike] = useState([0, 10, 5])
  let [modal, setModal] = useState(false)
  let [index, setIndex] = useState(0)
  let [input, setInput] = useState('')
  let today = new Date().toLocaleDateString('en-us')

  function sort() {
    let copy = [...subject] //title만 정렬됨. 날짜 등 모두 함께 정렬시키려면 object 자료를 정렬해야할듯
    copy.sort()
    setSubject(copy)
  }
  let submit = ()=>{
    if(!input) {
      alert('내용을 입력하세요')
    } else {
      let copySubject = [...subject]
      let copyDate = [...date]
      let copyLike = [...like]

      copySubject.unshift(input)
      setSubject(copySubject)
      copyDate.unshift(today)
      setDate(copyDate)
      copyLike.unshift(0)
      setLike(copyLike)
      // 삼항연산자 사용 시, false 내용이 길어서 setSubject()까지만 false로 치고 아래 줄은 조건식에 포함 시키지 않음(console.log check)
    }
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h1 style={{fontSize: '1em'}}>Blog</h1>
        <div>login</div>
      </div>
      <button onClick={ sort }>정렬</button>
      <ul className="list">
        {
          subject.map(function(a, i){
            return (
              <li key={i}>
                <a onClick={(()=>{
                  setModal(!modal)
                  setIndex(i)
                })}>
                  <h2>
                    {subject[i]}
                    <button className="like" onClick={(e)=>{
                      e.stopPropagation()
                      let copy = [...like]
                      copy[i] = copy[i]+1
                      setLike(copy)
                    }}>👍</button>
                    {like[i]}
                    <button onClick={(e)=>{
                      e.stopPropagation()
                      let copySubject = [...subject]
                      copySubject.splice(i, 1)
                      setSubject(copySubject)
                      let copyDate = [...date]
                      copyDate.splice(i, 1)
                      setDate(copyDate)
                      let copyLike = [...like]
                      copyLike.splice(i, 1)
                      setLike(copyLike)
                    }}>삭제</button>
                  </h2>
                </a>
                <div>{date[i]}</div>
              </li>
            )
          })
        }
      </ul>
      {console.log(subject, date, like)}
      <div>
        <input type="text" onChange={(e)=>{
          setInput(e.target.value)
        }} />
        <button onClick={ submit }>글발행</button>
      </div>
      {
        modal === false ? null : <Modal subject={subject} setSubject={setSubject} date={date} index={index} />
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h2>
        {props.subject[props.index]}
        <button onClick={(()=>{
          let copy = [...props.subject]
          copy[props.index] = '여자 코드 추천'
          props.setSubject(copy)
        })}>변경</button>
      </h2>
      <div>{props.date[props.index]}</div>
      <p>{props.subject[props.index]} 상세 내용</p>
    </div>
  )
}

export default App;
