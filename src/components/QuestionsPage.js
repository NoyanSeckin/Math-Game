import {React, useContext, useState, useEffect} from 'react'
import TourContext from '../context/TourContext'
import Finishpage from './FinishPage';
// import SVG from '../images/Union.js'
export default function QuestionsPage({setGameIsActive, setTour}) {
  const tourContext = useContext(TourContext);
  
  const [questionsActive, setQuestionsActive] = useState(true)
  const [question, setQuestion] = useState("")
  const [questions, setQuestions] = useState([]);
  const [correctTotal, setCorrectTotal] = useState(0);

  const [falseAnswer1, setFalseAnswer1] = useState(null);
  const [falseAnswer2, setFalseAnswer2] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [buttonsActive, setButtonsActive] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() =>{
    generateQuestions();
  }, [])
  useEffect(()=>{
    if(questions.length === 10){
      setTimeout(() => {
        setQuestionsActive(false);
      }, 2000);
    }
  }, [questions])
  
  const generateQuestions = () => {
    const randomNum1 = Math.floor(Math.random() * 10);
    const randomNum2 = Math.floor(Math.random() * 10);
    setQuestion(`${randomNum1} x ${randomNum2}`);
    let correctAnswer = randomNum1 * randomNum2;
    setCorrectAnswer(correctAnswer);
    // setQuestions(questions => [...questions, `${question} = ${correctAnswer}`]);

    let falseAnswer1 = randomNum1 - 1 * randomNum2;
    let falseAnswer2 = randomNum1 + 1 * randomNum2;
    if(falseAnswer1 === falseAnswer2){
      falseAnswer2 = randomNum1 * randomNum2;
    }else if(falseAnswer1 === falseAnswer2){
      falseAnswer1 = randomNum1 + 1 * randomNum2
    }

    setFalseAnswer1(Math.abs(falseAnswer1))
    setFalseAnswer2(Math.abs(falseAnswer2))
  }

  const renderAnswers = () => {
    return(
      <div className='col-6 mx-auto d-flex flex-col'> 
        <button disabled={buttonsActive} className='answer-tags as-start' onClick={()=> handleAnswer(true, correctAnswer)}>
          {correctAnswer}
          <img className='answer-images' src={require('../images/Vector10.png')} alt="" />
        </button>
        <button disabled={buttonsActive} className='answer-tags as-end' onClick={()=> handleAnswer(false)}>
          {falseAnswer1} 
          <img className='answer-images' src={require('../images/Vector10.png')} alt="" />
        </button>
        <button disabled={buttonsActive} className='answer-tags as-center' onClick={()=> handleAnswer(false)}>
          {falseAnswer2}
          <img className='answer-images' src={require('../images/Vector10.png')} alt="" />
        </button>
      </div>
    )
  }
  const isSquare = (n) => {
    return Math.sqrt(n) % 1 === 0;
};
  function handleAnswer(isCorrect, answer){
    const timeout = 3000;
    let bodyStyle= document.body.style;

    if(isCorrect){
      bodyStyle.background = "#00BF63";
      setQuestions(questions => ([...questions, `${question} = ${correctAnswer} ✓ `]));  

      const squareRootValue = Math.sqrt(answer);
      // add earned points to state value, check if square root first
      isSquare(answer) ? setScore(score + squareRootValue) 
        : setScore(score + Math.ceil(squareRootValue));

        setCorrectTotal(correctTotal + 1);
      setTimeout(() => {
        
      }, timeout);

    } 
    else if(!isCorrect){
      bodyStyle.background = "#FA0000";
      setQuestions(questions => ([...questions, `${question} = ${correctAnswer} X `]));
    }

    setButtonsActive(true);

    setTimeout(() => {
      bodyStyle.background = "#2D2D2D";
      generateQuestions();
      setButtonsActive(false);
    }, timeout);   
  }
  const renderPage = () =>{
    return(
      <div className='text-white container'>
        <div className="col-6 position-relative">
          <p className='current-question'>{question}
          <svg className='svg-file'  viewBox="0 0 948 944" fill="none" xmlns="http://www.w3.org/2000/svg">   

<path fill-rule="evenodd" clip-rule="evenodd" d="M226.798 80.4484C223.542 82.7825 217.239 86.3304 218.076 81.8489C219.122 76.247 237.962 3.77202 240.753 2.02142C243.544 0.270819 246.683 -1.47978 249.125 2.02142C251.568 5.52263 273.547 79.0479 270.756 80.4484C267.965 81.8489 262.731 83.2494 261.685 81.8489C260.848 80.7285 249.707 38.9008 244.241 18.127L226.798 80.4484ZM565.013 173.65C510.634 65.5188 622.679 16.9839 684.013 18.6506C690.013 15.4506 680.179 13.6506 674.513 13.1505C626.346 9.81722 541.013 41.6505 541.013 118.651C541.013 229.151 648.513 244.151 673.513 246.651L673.57 246.656C675.923 259.407 678.848 276.102 681.846 294.534C675.778 301.716 669.215 309.756 662.325 318.198C621.362 368.38 568.834 432.731 540.013 415.151C490.013 384.651 467.013 290.151 467.013 241.651L466.896 241.569C459.588 205.687 441.363 211.094 432.267 213.792C429.393 214.644 427.431 215.227 427.013 214.151C420.628 197.734 416.513 187.151 409.513 159.151C404.846 158.317 395.613 157.751 396.013 162.151C396.413 166.551 409.846 204.651 416.513 223.151C408.179 229.817 393.813 250.551 401.013 260.151C409.84 271.921 420.592 283.21 454.026 286.469C462.433 336.688 501.389 401.527 509.013 409.151C532.882 433.02 580.985 450.954 684.31 309.981C691.329 354.901 698.013 406.02 698.013 435.151C698.013 455.997 697.224 478.619 696.504 499.25L696.504 499.253V499.255V499.257V499.258V499.259L696.504 499.264V499.265V499.266L696.504 499.268L696.504 499.273V499.275V499.276V499.278C695.491 528.305 694.616 553.388 696.269 564.039C685.303 595.292 658.383 673.835 648.513 719.151C635.988 776.651 665.513 903.651 665.513 903.651C665.513 903.651 651.513 881.151 617.013 871.151C582.513 861.151 545.513 909.151 595.513 929.651C645.513 950.151 667.917 943.26 665.513 937.651C664.013 934.151 659.513 934.151 659.513 934.151C659.513 934.151 570.013 928.651 586.513 890.651C603.013 852.651 665.513 919.151 671.013 926.651C676.513 934.151 686.513 931.151 684.013 921.651C683.893 921.195 683.699 920.48 683.441 919.525L683.437 919.511C678.305 900.537 647.735 787.522 659.513 735.651C669.417 692.03 694.216 615.096 703.722 586.121C703.925 586.693 704.139 587.263 704.365 587.829C729.62 651.056 738.7 687.149 745.974 716.067C757.932 763.599 765.013 791.748 831.031 889.15C817.723 883.155 796.173 874.348 782.013 871.651C761.013 867.651 729.013 884.651 733.013 914.651C736.213 938.651 758.013 942.651 768.513 941.651C790.884 933.341 835.991 915.686 844.608 908.956L844.866 909.328L853.866 904.828C781.701 800.024 769.431 753.681 754.983 699.107C745.723 664.13 735.567 625.771 708.175 566.475C708.396 565.474 708.513 564.358 708.513 563.151C708.513 562.699 708.578 561.293 708.683 559.021C709.799 534.993 715.416 414.03 695.96 298.508C710.209 300.781 740.522 320.966 758.513 341.151C771.411 355.622 781.307 372.34 789.919 386.891L789.92 386.892C801.89 407.114 811.381 423.151 823.013 423.151C858.929 423.151 886.544 372.543 907.225 334.644L907.228 334.639C910.869 327.967 914.294 321.689 917.513 316.151C957.013 296.151 948.846 272.484 941.013 261.151C935.179 251.151 916.413 236.151 888.013 256.151C859.613 276.151 885.346 305.817 901.513 318.151C901.513 318.151 856.013 411.291 834.013 413.651C833.641 413.69 833.275 413.735 832.912 413.779L832.91 413.78C824.672 414.786 817.996 415.602 781.601 355.264C752.849 307.596 715.491 292.149 694.463 289.909C694.178 288.325 693.888 286.742 693.593 285.16C693.58 285.059 693.562 284.963 693.54 284.874C691.161 272.146 688.461 259.535 685.399 247.179C735.785 246.98 827.032 218.995 815.513 123.151C803.013 19.1505 699.513 4.24669 666.513 6.15055C645.713 7.35056 650.513 11.3172 655.513 13.1505C764.513 2.65054 805.013 92.1505 805.013 137.651C805.013 263.151 608.513 260.151 565.013 173.65ZM814.941 893.355C825.776 898.636 835.387 903.32 841.156 903.959C841.527 904.497 841.899 905.038 842.274 905.58C840.073 906.25 837.524 907.263 835.513 908.151C834.293 908.826 833.039 909.523 831.753 910.238C808.614 923.098 775.58 941.458 762.513 935.651C733.013 922.539 745.013 876.151 770.013 877.151C782.74 877.66 800.004 886.074 814.941 893.355ZM936.513 281.651C936.513 292.144 925.32 309.651 911.513 309.651C897.705 309.651 886.513 292.144 886.513 281.651C886.513 271.157 901.705 256.651 915.513 256.651C929.32 256.651 936.513 271.157 936.513 281.651ZM440.513 225.651C441.349 227.184 442.095 228.266 442.752 229.069C446.885 237.89 450.105 252.755 452.855 277.704C432.255 271.934 403.546 255.622 419.513 236.151C421.394 233.856 422.007 237.67 422.685 241.894C423.338 245.955 424.052 250.396 426.013 250.151C429.213 249.751 434.679 247.317 437.013 246.151L431.013 225.651C430.513 222.984 437.513 220.151 440.513 225.651ZM723.949 116.794C727.102 112.797 725.663 98.6344 724.549 92.0529C727.109 89.5687 732.678 85.856 734.48 90.8792C736.733 97.1582 733.298 119.214 730.932 120.5C728.567 121.787 720.008 121.791 723.949 116.794ZM659.792 91.2707C660.126 97.9373 659.892 112.171 656.292 115.771C651.792 120.271 660.292 121.271 662.792 120.271C665.292 119.271 671.292 97.7707 669.792 91.2707C668.592 86.0707 662.626 89.104 659.792 91.2707ZM702.792 163.271C688.626 162.271 655.508 165.818 662.292 181.271C671.292 201.771 708.292 193.771 707.292 188.771C706.917 186.893 701.98 186.496 696.032 186.018C686.14 185.222 673.449 184.202 674.292 175.771C674.788 170.809 683.901 170.032 691.919 169.349C700.061 168.655 707.075 168.057 702.792 163.271ZM18.166 116.887H441.911V110.887L8.41147 109.07C2.01859 109.488 -0.450877 112.046 0.0666547 114.178L13.4677 519.794C13.6399 519.868 13.8104 519.94 13.9791 520.01C14.419 523.615 17.0229 527.203 22.3246 527.887L580.411 453.387V441.543L31.1999 511.392L18.166 116.887ZM173.604 528.305L185.237 529.312L151.879 914.871L140.245 913.865L173.604 528.305ZM368.259 504.887L356.911 507.643L448.247 883.71L459.595 880.954L368.259 504.887Z" fill="white"/>
          </svg>
          </p>
        </div>
        <div className="col-6">
          <div className='d-flex space-between'>
            <p onClick={generateQuestions} className='sub-header2'>Score: {score} </p>
            <p className='sub-header2'>Tour: {tourContext}</p>
            <p className='sub-header2'>Questions: {correctTotal}/{questions.length}</p>
           </div>
            <div>
             {renderAnswers()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {questionsActive && renderPage()}
      {!questionsActive && 
      <Finishpage point={score} questions={questions} correctAnswers={correctTotal} setGameIsActive={setGameIsActive} setTour={setTour}></Finishpage>}
    </div>
  )
}
